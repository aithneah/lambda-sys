package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.{DeclarationDegree, DeclarationStructure, StudentViewOfDeclaration}
import nea.lambdasys.core.DeclarationManager
import nea.lambdasys.core.domain.{Assignment, Exercise}
import spray.json.DefaultJsonProtocol

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class DeclarationApi(declarations: DeclarationManager)
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
    )
  }

  def getStudentsDeclarations(studentIndex: String): Future[Seq[StudentViewOfDeclaration]] = async {
    val studentsDeclarations = await(declarations.getDeclarations(studentIndex))

    studentsDeclarations.map { declaration =>
      StudentViewOfDeclaration(
        lists = declaration.assignments.map(_.name),
        classesId = declaration.classesId,
        classesDate = "NOT IMPLEMENTED",
        completionDate = declaration.submitted.map(_.toString)
      )
    }
  }

  import DeclarationStructure.{Node => DeclarationNode}

  def getDeclarationStructure(studentIndex: String, classesId: Int): Future[DeclarationStructure] = async {
    val declaration = await(declarations.getDeclaration(studentIndex, classesId))

    def makeExerciseNode(exercise: Exercise): DeclarationNode = {
      val children = exercise.children.map(makeExerciseNode)
      val declarationDegree = children.foldLeft(DeclarationDegree.fromBoolean(exercise.isDeclared))(_ | _.isDeclared)

      DeclarationNode(
        name = exercise.name,
        `type` = exercise.`type`.toString.toLowerCase,
        isDeclared = declarationDegree,
        None,
        children: _*
      )
    }

    def makeAssignmentNode(assignment: Assignment): DeclarationNode = {
      val children = assignment.exercises.map(makeExerciseNode)
      val declarationDegree = children.map(_.isDeclared).reduceOption(_ | _).getOrElse(DeclarationDegree.Not)

      DeclarationNode(
        name = assignment.name,
        `type` = "list",
        isDeclared = declarationDegree,
        None,
        children: _*
      )
    }

    DeclarationStructure(
      declaration.get.assignments.map(makeAssignmentNode): _*
    )
  }
}
