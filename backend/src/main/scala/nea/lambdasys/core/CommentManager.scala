package nea.lambdasys.core

import nea.lambdasys.api.model.Comment
import nea.lambdasys.db.{model => dbm}
import nea.lambdasys.db.LambdaDb

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class CommentManager(db: LambdaDb) {

  def updateOrCreateComment(studentIndex: String, comment: Comment)
                           (implicit ec: ExecutionContext): Future[Unit] = async {
    val maybeDeclaredExercise = await(db.getDeclaredExereciseByStudentAndExercise(studentIndex, comment.exerciseId))

    maybeDeclaredExercise match {
      case Some(declaredExercise) =>
        await(db.updateOrCreateComment(dbm.Comment(
          declaredExerciseId = declaredExercise.id.get,
          commentContent = comment.commentContent,
          note = comment.note
        )))
      case None =>
        throw new IllegalArgumentException(s"The exercise [${comment.exerciseId}] was not declared by [$studentIndex].")
    }
  }

  def countCommentsByStudent(studentIndex: String): Future[Int] =
    db.countCommentsByStudent(studentIndex)

  def getNotesByStudent(studentIndex: String)(implicit ec: ExecutionContext): Future[String] =
    async {
      val notes = await(db.getNotesByStudent(studentIndex))

      val overallNote = if (notes.isEmpty) 0
      else math.round(notes.map {
        case "negative" => -1
        case "positive" => 1
        case _ => 0
      }.sum / notes.length.toDouble).toInt

      overallNote match {
        case -1 => "negative"
        case 1 => "positive"
        case _ => "neutral"
      }
    }
}
