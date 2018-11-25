package nea.lambdasys.model

import spray.json._

case class List(name: String,
                classesDate: String,
                numberOfDeclarations: Int)

object List {
  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[List] = jsonFormat3(List.apply)
}
