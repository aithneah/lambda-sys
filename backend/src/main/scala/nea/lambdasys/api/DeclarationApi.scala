package nea.lambdasys.api

import java.time.LocalDateTime

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.{DeclarationDegree, DeclarationStructure, StudentViewOfDeclaration}
import nea.lambdasys.core.{ClassesManager, DeclarationManager, domain => cdm}
import nea.lambdasys.core.domain.{Assignment, Exercise, ExerciseType}
import spray.json.DefaultJsonProtocol

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class DeclarationApi(declarations: DeclarationManager,
                     classes: ClassesManager)
                    (implicit ec: ExecutionContext) extends Directives
  with SprayJsonSupport
  with DefaultJsonProtocol {

  def route(studentIndex: String): Route = pathPrefix("declarations") {
    concat(
      (get & pathEnd) {
        complete(getStudentsDeclarations(studentIndex))
      },
      (get & path(IntNumber / "structure")) {
        classesId => complete(getDeclarationStructure(studentIndex, classesId))
      },
      (post & path(IntNumber / "structure") & entity(as[DeclarationStructure])) {
        (classesId, declarationStructure) => complete(updateDeclaration(studentIndex, classesId, declarationStructure))
      }
    )
  }

  def getStudentsDeclarations(studentIndex: String): Future[Seq[StudentViewOfDeclaration]] = async {
    val studentsDeclarations = await(declarations.getDeclarations(studentIndex))

    await(Future.sequence {
      studentsDeclarations.map { declaration =>
        classes.getClassesById(declaration.classesId)
          .map { maybeClasses =>
            val classesDate = maybeClasses.get.date
              .atTime(maybeClasses.get.time)

            StudentViewOfDeclaration(
              lists = declaration.assignments.map(_.name),
              classesId = declaration.classesId,
              classesDate = classesDate.toString,
              completionDate = declaration.submitted.map(_.toString)
            )
          }
      }
    })
  }

  import DeclarationStructure.{Node => DeclarationNode}

  def makeExerciseNode(exercise: cdm.Exercise): DeclarationNode = {
    val children = exercise.children.map(makeExerciseNode)
    val declarationDegree = children
      .map(_.isDeclared)
      .reduceOption(_ | _)
      .getOrElse(DeclarationDegree.fromBoolean(exercise.isDeclared))

    DeclarationNode(
      id = exercise.id,
      name = exercise.name,
      `type` = exercise.`type`.toString.toLowerCase,
      isDeclared = declarationDegree,
      None,
      children: _*
    )
  }

  def makeAssignmentNode(assignment: cdm.Assignment): DeclarationNode = {
    val children = assignment.exercises.map(makeExerciseNode)
    val declarationDegree = children.map(_.isDeclared).reduceOption(_ | _).getOrElse(DeclarationDegree.Not)

    DeclarationNode(
      id = assignment.id,
      name = assignment.name,
      `type` = "list",
      isDeclared = declarationDegree,
      None,
      children: _*
    )
  }

  def getDeclarationStructure(studentIndex: String, classesId: Int): Future[DeclarationStructure] = async {
    val declaration = await(declarations.getDeclaration(studentIndex, classesId))

    DeclarationStructure(
      declaration.get.assignments.map(makeAssignmentNode): _*
    )
  }

  def updateDeclaration(studentIndex: String,
                        classesId: Int,
                        declarationStructure: DeclarationStructure): Future[String] = async {

    def extractExercise(node: DeclarationNode): cdm.Exercise =
      cdm.Exercise(
        id = node.id,
        name = node.name,
        ordinalNumber = 0,
        `type` = ExerciseType.fromString(node.`type`.capitalize).get,
        isDeclared = node.isDeclared.toBoolean,
        contents = None,
        children = node.children.map(extractExercise)
      )

    def extractAssignment(node: DeclarationNode): cdm.Assignment =
      cdm.Assignment(
        id = node.id,
        ordinalNumber = 0,
        name = node.name,
        exercises = node.children.map(extractExercise)
      )

    val declaration = cdm.Declaration(
      id = None,
      studentIndex,
      classesId,
      None,
      false,
      assignments = declarationStructure.structure.map(extractAssignment)
    )

    await(declarations.updateDeclaration(studentIndex, classesId, declaration))

    ""
  }
}
