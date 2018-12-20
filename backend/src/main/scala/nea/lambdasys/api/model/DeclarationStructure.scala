package nea.lambdasys.api.model

import nea.lambdasys.api.model.DeclarationStructure.Node
import spray.json._

case class DeclarationStructure(structure: Node*)

object DeclarationStructure {

  import DefaultJsonProtocol._

  case class Node(name: String,
                  `type`: String,
                  isDeclared: DeclarationDegree,
                  isChecked: Option[Boolean],
                  comment: Option[String],
                  note: Option[String],
                  children: Node*) {

    def copy(name: String = name,
             `type`: String = `type`,
             isDeclared: DeclarationDegree = isDeclared,
             isChecked: Option[Boolean] = isChecked,
             children: Seq[Node] = children): Node =
      Node(name, `type`, isDeclared, isChecked, comment, note, children: _*)
  }

  object Node {

    def apply(name: String,
              `type`: String,
              children: Node*): Node =
      new Node(name, `type`, DeclarationDegree.Not, None, Some(""), None, children: _*)

    def apply(name: String,
              `type`: String,
              isDeclared: DeclarationDegree,
              isChecked: Option[Boolean],
              children: Node*): Node =
      new Node(name, `type`, isDeclared, isChecked, Some(""), None, children: _*)

    implicit val format: RootJsonFormat[Node] = rootFormat(lazyFormat(jsonFormat(
      (n: String,
       t: String,
       d: DeclarationDegree,
       c: Option[Boolean],
       nt: Option[String],
       cm: Option[String],
       ch: Seq[Node]) => Node(n, t, d, c, nt, cm, ch: _*),
      "name",
      "type",
      "isDeclared",
      "isChecked",
      "note",
      "comment",
      "children")))
  }

  implicit val format: RootJsonFormat[DeclarationStructure] = jsonFormat(DeclarationStructure.apply, "structure")
}