package nea.lambdasys.db.tables

import java.time.{DayOfWeek, LocalTime}

import nea.lambdasys.db.ScalaTypesSupport

//import nea.lambdasys.db.ScalaTypesSupport._
import nea.lambdasys.db.model.{Group, WeekParity}
import slick.jdbc.PostgresProfile.api._

class Groups(tag: Tag) extends Table[Group](tag, "GROUPS")  with ScalaTypesSupport {

  def id = column[String]("ID", O.PrimaryKey)

  def dayOfWeek = column[DayOfWeek]("DAY_OF_WEEK")

  def weekParity = column[WeekParity]("WEEK_PARITY")

  def classesTime = column[LocalTime]("CLASSES_TIME")

  def * = (id, dayOfWeek, weekParity, classesTime) <> (Group.tupled, Group.unapply)
}

object Groups extends TableQuery(new Groups(_))