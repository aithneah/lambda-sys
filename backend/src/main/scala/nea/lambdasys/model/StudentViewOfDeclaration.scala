package nea.lambdasys.model

import spray.json._

case class StudentViewOfDeclaration(lists: Seq[String],
                                    classesId: String,
                                    classesDate: String,
                                    completionDate: Option[String])

object StudentViewOfDeclaration {

  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[StudentViewOfDeclaration] = jsonFormat4(StudentViewOfDeclaration.apply)
}