package nea.lambdasys.db.model

case class Comment(id: Option[Int],
                   declaredExerciseId: Int,
                   commentContent: Option[String],
                   note: String)