package nea.lambdasys.db.tables

import nea.lambdasys.db.model.Assignment
import slick.jdbc.PostgresProfile.api._

class Assignments(tag: Tag) extends Table[Assignment](tag, "ASSIGNMENTS") {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

  def ordinalNumber = column[Int]("ORDINAL_NUMBER")

  def name = column[String]("NAME")

  def * = (id.?, ordinalNumber, name) <> (Assignment.tupled, Assignment.unapply)
}

object Assignments extends TableQuery(new Assignments(_))