package nea.lambdasys.api.model

import spray.json._

sealed trait DeclarationDegree {

  import DeclarationDegree._

  def |(that: DeclarationDegree): DeclarationDegree = (this, that) match {
    case (Fully, Fully) => Fully
    case (Not, Not) => Not
    case _ => Partially
  }

  def toBoolean: Boolean = this match {
    case Fully => true
    case Partially => false
    case Not => false
  }
}

object DeclarationDegree {

  case object Fully extends DeclarationDegree

  case object Partially extends DeclarationDegree

  case object Not extends DeclarationDegree

  def values: Seq[DeclarationDegree] = Seq(Fully, Partially, Not)

  def fromString(string: String): Option[DeclarationDegree] =
    values.find(_.toString == string)

  def fromBoolean(boolean: Boolean): DeclarationDegree =
    if (boolean) Fully else Not

  import DefaultJsonProtocol._

  implicit def format: RootJsonFormat[DeclarationDegree] = new RootJsonFormat[DeclarationDegree] {

    override def read(json: JsValue): DeclarationDegree = {
      val string = json.convertTo[String].capitalize

      DeclarationDegree.fromString(string) match {
        case Some(declarationDegree) => declarationDegree
        case None => deserializationError(s"Could not deserialize [$string] as DeclarationDegree.")
      }
    }

    override def write(declarationDegree: DeclarationDegree): JsValue =
      declarationDegree.toString.toLowerCase.toJson
  }
}
