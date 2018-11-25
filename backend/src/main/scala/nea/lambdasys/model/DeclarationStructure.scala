package nea.lambdasys.model

import nea.lambdasys.model.DeclarationStructure.Node
import spray.json._

case class DeclarationStructure(structure: Node*)

object DeclarationStructure {

  import DefaultJsonProtocol._

  case class Node(name: String,
                  `type`: String,
                  isDeclared: String,
                  isChecked: Option[Boolean],
                  comment: Option[String],
                  note: Option[String],
                  children: Node*) {

    def copy(name: String = name,
             `type`: String = `type`,
             isDeclared: String = isDeclared,
             isChecked: Option[Boolean] = isChecked,
             children: Seq[Node] = children): Node =
      Node(name, `type`, isDeclared, isChecked, comment, note, children: _*)
  }

  object Node {

    def apply(name: String,
              `type`: String,
              children: Node*): Node =
      new Node(name, `type`, "not", None, Some(""), None, children: _*)

    def apply(name: String,
              `type`: String,
              isDeclared: String,
              isChecked: Option[Boolean],
              children: Node*): Node =
      new Node(name, `type`, isDeclared, isChecked, Some(""), None, children: _*)

    implicit val format: RootJsonFormat[Node] = rootFormat(lazyFormat(jsonFormat(
      (n: String,
       t: String,
       d: String,
       c: Option[Boolean],
       cm: Option[String],
       nt: Option[String],
       ch: Seq[Node]) => Node(n, t, d, c, cm, nt, ch: _*),
      "name",
      "type",
      "isDeclared",
      "isChecked",
      "comment",
      "note",
      "children")))
  }

  implicit val format: RootJsonFormat[DeclarationStructure] = jsonFormat(DeclarationStructure.apply, "structure")
}