package nea.lambdasys.db.tables

import nea.lambdasys.core.domain.ExerciseType
import nea.lambdasys.db.ScalaTypesSupport
import nea.lambdasys.db.model.Exercise
import slick.jdbc.PostgresProfile.api._

class Exercises(tag: Tag) extends Table[Exercise](tag, "EXERCISES") with ScalaTypesSupport {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

  def name = column[String]("NAME")

  def ordinalNumber = column[Int]("ORDINAL_NUMBER")

  def `type` = column[ExerciseType]("EXERCISE_TYPE")

  def contents = column[Option[String]]("CONTENTS")

  def parentId = column[Option[Int]]("PARENT_ID")

  def assignmentId = column[Int]("ASSIGNMENT_ID")

  def * = (id.?, name, ordinalNumber, `type`, contents, parentId, assignmentId) <>
    (Exercise.tupled, Exercise.unapply)

  def parent = foreignKey("PARENT_FK", parentId, Exercises)(_.id)

  def assignment = foreignKey("ASSIGNMENT_FK", assignmentId, Assignments)(_.id)
}

object Exercises extends TableQuery(new Exercises(_))
