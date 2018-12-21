package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.{DeclarationStructure, StudentOverallProgress}
import nea.lambdasys.core.{DeclarationManager, StudentManager}
import spray.json.DefaultJsonProtocol

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class StudentApi(students: StudentManager,
                 declarations: DeclarationManager,
                 declarationApi: DeclarationApi)
                (implicit ec: ExecutionContext) extends Directives
  with SprayJsonSupport
  with DefaultJsonProtocol {

  val route: Route = pathPrefix("students") {
    pathPrefix(Segment) { studentIndex =>
      concat(
        declarationApi.route(studentIndex),
        get {
          complete(getStudentOverallProgress(studentIndex))
        }
      )
    }
  }

  def getStudentOverallProgress(studentId: String): Future[StudentOverallProgress] = async {
    val student = await(students.getStudentByIndex(studentId)).get
    val declarationStructures = await(declarations.getDeclarations(studentId))
      .flatMap(declaration => declaration.assignments)
      .sortBy(_.ordinalNumber)
      .map(declarationApi.makeAssignmentNode)

    StudentOverallProgress(studentId,
      s"${student.name} ${student.surname}",
      "bad",
      64,
      Seq(95, 67, 30, 0, 13),
      DeclarationStructure(declarationStructures: _*)
    )
  }
}
