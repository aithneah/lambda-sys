package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.StudentViewOfStudentAccount
import nea.lambdasys.core.{GroupManager, StudentManager}

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class AccountApi(students: StudentManager,
                 groups: GroupManager)
                (implicit ec: ExecutionContext) extends Directives with SprayJsonSupport {

  val route: Route = pathPrefix("accounts") {
    concat(
      (get & path(Segment)) { studentIndex =>
        complete(getStudent(studentIndex))
      }
    )
  }

  def getStudent(studentIndex: String): Future[StudentViewOfStudentAccount] = async {
    val student = await(students.getStudentByIndex(studentIndex)).get
    val group = await(groups.getGroup(student.groupId)).get

    StudentViewOfStudentAccount(
      studentIndex,
      s"${student.name} ${student.surname}",
      CustomFormats.formatClassesDate(group.dayOfWeek, group.weekParity, group.classesTime)
    )
  }
}
