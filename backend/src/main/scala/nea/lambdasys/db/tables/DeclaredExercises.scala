package nea.lambdasys.db.tables

import nea.lambdasys.db.model.DeclaredExercise
import slick.jdbc.PostgresProfile.api._

class DeclaredExercises(tag: Tag) extends Table[DeclaredExercise](tag, "DECLARED_EXERCISES") {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

  def declarationId = column[Int]("DECLARATION_ID")

  def exerciseId = column[Int]("EXERCISE_ID")

  def * = (id.?, declarationId, exerciseId) <> (DeclaredExercise.tupled, DeclaredExercise.unapply)

  def declaration = foreignKey("DECLARATION_FK", declarationId, Declarations)(_.id)

  def exercise = foreignKey("EXERCISE_FK", exerciseId, Exercises)(_.id)
}

object DeclaredExercises extends TableQuery(new DeclaredExercises(_))