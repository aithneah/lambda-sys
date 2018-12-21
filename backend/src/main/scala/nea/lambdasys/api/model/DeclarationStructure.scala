package nea.lambdasys.api.model

import nea.lambdasys.api.model.DeclarationStructure.Node
import spray.json._

case class DeclarationStructure(structure: Node*)

object DeclarationStructure {

  import DefaultJsonProtocol._

  case class Node(id: Int,
                  name: String,
                  `type`: String,
                  isDeclared: DeclarationDegree,
                  isChecked: Option[Boolean],
                  comment: Option[String],
                  note: Option[String],
                  children: Node*) {

    def copy(id: Int = id,
             name: String = name,
             `type`: String = `type`,
             isDeclared: DeclarationDegree = isDeclared,
             isChecked: Option[Boolean] = isChecked,
             children: Seq[Node] = children): Node =
      Node(id, name, `type`, isDeclared, isChecked, comment, note, children: _*)
  }

  object Node {

    def apply(name: String,
              `type`: String,
              children: Node*): Node =
      new Node(0, name, `type`, DeclarationDegree.Not, None, Some(""), None, children: _*)

    def apply(id: Int,
              name: String,
              `type`: String,
              isDeclared: DeclarationDegree,
              isChecked: Option[Boolean],
              children: Node*): Node =
      new Node(id, name, `type`, isDeclared, isChecked, Some(""), None, children: _*)

    implicit val format: RootJsonFormat[Node] = rootFormat(lazyFormat(jsonFormat(
      (i: Int,
       n: String,
       t: String,
       d: DeclarationDegree,
       c: Option[Boolean],
       nt: Option[String],
       cm: Option[String],
       ch: Seq[Node]) => Node(i, n, t, d, c, nt, cm, ch: _*),
      "id",
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