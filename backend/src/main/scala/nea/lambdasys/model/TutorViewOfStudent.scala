package nea.lambdasys.model

import spray.json._

case class TutorViewOfStudent(index: String,
                              name: String)

object TutorViewOfStudent {
  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[TutorViewOfStudent] = jsonFormat2(TutorViewOfStudent.apply)
}
