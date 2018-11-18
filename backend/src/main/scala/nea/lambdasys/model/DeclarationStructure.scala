package nea.lambdasys.model

import nea.lambdasys.model.DeclarationStructure.Node
import spray.json._

case class DeclarationStructure(structure: Node*) {

}

object DeclarationStructure {

  import DefaultJsonProtocol._

  case class Node(name: String, `type`: String, children: Node*)

  object Node {

    implicit val format: RootJsonFormat[Node] = rootFormat(lazyFormat(jsonFormat(Node.apply, "name", "type", "children")))
  }

  implicit val format: RootJsonFormat[DeclarationStructure] = jsonFormat(DeclarationStructure.apply, "structure")
}