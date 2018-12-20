package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.StudentViewOfStudentAccount

class AccountApi extends Directives with SprayJsonSupport {

  val route: Route = pathPrefix("accounts") {
    concat(
      (get & path(Segment)) { studentIndex =>
        complete(getStudent(studentIndex))
      }
    )
  }

  def getStudent(studentIndex: String): StudentViewOfStudentAccount =
    StudentViewOfStudentAccount(studentIndex, "Mariusz Kowalski", "Poniedzialek TN 11:15")
}
