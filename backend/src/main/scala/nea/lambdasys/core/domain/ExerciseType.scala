package nea.lambdasys.core.domain

sealed trait ExerciseType

object ExerciseType {

  case object Exercise extends ExerciseType

  case object Subpoint extends ExerciseType

  case object Language extends ExerciseType

  def values: Seq[ExerciseType] = Seq(Exercise, Subpoint, Language)

  def fromString(string: String): Option[ExerciseType] =
    values.find(_.toString == string)
}