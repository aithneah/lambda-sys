package nea.lambdasys.model

import spray.json._

case class Group(id: String,
                 classesDate: String,
                 studentCount: Int)

object Group {
  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[Group] = jsonFormat3(Group.apply)
}
