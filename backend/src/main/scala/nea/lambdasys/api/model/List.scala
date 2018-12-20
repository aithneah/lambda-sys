package nea.lambdasys.api.model

import spray.json._

case class List(id: String,
                name: String,
                classesDate: String,
                numberOfDeclarations: Int)

object List {
  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[List] = jsonFormat4(List.apply)
}
