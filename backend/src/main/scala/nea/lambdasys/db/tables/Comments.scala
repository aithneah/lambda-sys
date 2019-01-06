package nea.lambdasys.db.tables

import nea.lambdasys.db.model.Comment
import slick.jdbc.PostgresProfile.api._

class Comments(tag: Tag) extends Table[Comment](tag, "COMMENTS") {

  def declaredExerciseId = column[Int]("DECLARED_EXERCISE_ID", O.PrimaryKey)

  def commentContent = column[Option[String]]("COMMENT_CONTENT")

  def note = column[String]("NOTE")

  def * = (declaredExerciseId, commentContent, note) <>
    (Comment.tupled, Comment.unapply)

  def declaredExercise =
    foreignKey("DECLARED_EXERCISE_FK", declaredExerciseId, DeclaredExercises)(_.id)
}

object Comments extends TableQuery(new Comments(_))
