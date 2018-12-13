package nea.lambdasys.db

import nea.lambdasys.domain.ClassesAssignment
import slick.jdbc.PostgresProfile.api._

class ClassesAssignments(tag: Tag) extends Table[ClassesAssignment](tag, "CLASSES_ASSIGNMENTS") {

  def classesId = column[Int]("CLASSES_ID")

  def assignmentId = column[Int]("ASSIGNMENT_ID")

  def * = (classesId, assignmentId) <> (ClassesAssignment.tupled, ClassesAssignment.unapply)

  def pk = primaryKey("CLASSES_ASSIGNMENT_PK", (classesId, assignmentId))

  def classes = foreignKey("CLASSES_FK", classesId, Classess)(_.id)

  def assignment = foreignKey("ASSIGNMENT_FK", assignmentId, Assignments)(_.id)
}

object ClassesAssignments extends TableQuery(new ClassesAssignments(_))
