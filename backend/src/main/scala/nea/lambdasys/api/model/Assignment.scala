package nea.lambdasys.api.model

import spray.json._

case class Assignment(id: Int,
                      name: String,
                      classesDate: String,
                      numberOfDeclarations: Int)

object Assignment {
  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[Assignment] = jsonFormat4(Assignment.apply)
}
