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
}
