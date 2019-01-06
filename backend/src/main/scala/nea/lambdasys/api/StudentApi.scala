package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.{Comment, DeclarationStructure, StudentOverallProgress}
import nea.lambdasys.core.domain.{Assignment, Exercise}
import nea.lambdasys.core.{CommentManager, DeclarationManager, StudentManager}
import spray.json.DefaultJsonProtocol

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class StudentApi(students: StudentManager,
                 declarations: DeclarationManager,
                 comments: CommentManager,
                 declarationApi: DeclarationApi)
                (implicit ec: ExecutionContext) extends Directives
  with SprayJsonSupport
  with DefaultJsonProtocol {

  val route: Route = pathPrefix("students") {
    pathPrefix(Segment) { studentIndex =>
      concat(
        declarationApi.route(studentIndex),
        (get & pathEnd) {
          complete(getStudentOverallProgress(studentIndex))
        },
        (post & path("comment") & entity(as[Comment])) { comment =>
          onComplete(applyComment(studentIndex, comment))(_ => complete(""))
        }
      )
    }
  }

  def getStudentOverallProgress(studentId: String): Future[StudentOverallProgress] = async {
    val student = await(students.getStudentByIndex(studentId)).get
    val assignments = await(declarations.getDeclarations(studentId))
      .flatMap(declaration => declaration.assignments)
      .sortBy(_.ordinalNumber)

    val assignmentsProgress = assignments.map(calculateAssignmentProgress)

    StudentOverallProgress(studentId,
      s"${student.name} ${student.surname}",
      "bad",
      math.round(assignmentsProgress.sum / assignments.size * 100).toInt,
      assignmentsProgress.map(progress => Math.round(progress * 100).toInt),
      DeclarationStructure(assignments.map(declarationApi.makeAssignmentNode): _*)
    )
  }

  def calculateAssignmentProgress(assignment: Assignment): Double = {
    def countLeaves(exercise: Exercise, condition: Exercise => Boolean): Int = {
      exercise.children match {
        case Seq() => if (condition(exercise)) 1 else 0
        case _ => exercise.children.map(countLeaves(_, condition)).sum
      }
    }

    assignment.exercises.map(exercise => countLeaves(exercise, _.isDeclared)).sum /
    assignment.exercises.map(exercise => countLeaves(exercise, _ => true)).sum.toDouble
  }

  def applyComment(index: String, comment: Comment): Future[Unit] =
    comments.updateOrCreateComment(index, comment)
}
