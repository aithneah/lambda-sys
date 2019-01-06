package nea.lambdasys.db.model

case class Comment(declaredExerciseId: Int,
                   commentContent: Option[String],
                   note: String)