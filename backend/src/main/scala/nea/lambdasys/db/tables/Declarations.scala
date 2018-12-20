package nea.lambdasys.db.tables

import java.time.LocalDateTime

import nea.lambdasys.db.ScalaTypesSupport
import nea.lambdasys.db.model.Declaration
import slick.jdbc.PostgresProfile.api._

class Declarations(tag: Tag) extends Table[Declaration](tag, "DECLARATIONS") with ScalaTypesSupport {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

  def submitted = column[LocalDateTime]("SUBMITTED")

  def isCancelled = column[Boolean]("CANCELLED")

  def classesId = column[Int]("CLASSES_ID")

  def studentIndex = column[String]("STUDENT_INDEX")

  def * = (id.?, submitted, isCancelled, classesId, studentIndex) <>
    (Declaration.tupled, Declaration.unapply)

  def classes = foreignKey("CLASSES_FK", classesId, Classess)(_.id)

  def student = foreignKey("STUDENT_FK", studentIndex, Students)(_.index)
}

object Declarations extends TableQuery(new Declarations(_))