package nea.lambdasys.api.model

import spray.json._

case class Comment(exerciseId: Int,
                   commentContent: Option[String],
                   note: String)

object Comment {
  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[Comment] = jsonFormat3(Comment.apply)
}