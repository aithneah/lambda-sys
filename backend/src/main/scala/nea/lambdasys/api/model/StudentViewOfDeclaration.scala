package nea.lambdasys.api.model

import spray.json._

case class StudentViewOfDeclaration(lists: Seq[String],
                                    classesId: Int,
                                    classesDate: String,
                                    completionDate: Option[String])

object StudentViewOfDeclaration {

  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[StudentViewOfDeclaration] = jsonFormat4(StudentViewOfDeclaration.apply)
}