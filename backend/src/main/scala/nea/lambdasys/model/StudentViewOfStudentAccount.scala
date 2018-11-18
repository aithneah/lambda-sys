package nea.lambdasys.model

import spray.json._

case class StudentViewOfStudentAccount(index: String,
                                       name: String,
                                       course: String)

object StudentViewOfStudentAccount {

  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[StudentViewOfStudentAccount] = jsonFormat3(StudentViewOfStudentAccount.apply)
}