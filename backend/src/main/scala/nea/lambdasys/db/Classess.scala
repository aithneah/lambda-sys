package nea.lambdasys.db

import java.time.{Duration, LocalDate, LocalTime}

import nea.lambdasys.domain.Classes
import slick.jdbc.PostgresProfile.api._

class Classess(tag: Tag) extends Table[Classes](tag, "CLASSES") with ScalaTypesSupport {

  def id = column[Int]("ID", O.PrimaryKey, O.AutoInc)

  def date = column[LocalDate]("DATE")

  def time = column[LocalTime]("TIME")

  def duration = column[Duration]("DURATION")

  def groupId = column[String]("GROUP_ID")

  def * = (id.?, date, time, duration, groupId) <> (Classes.tupled, Classes.unapply)

  def group = foreignKey("GROUP_FK", groupId, Groups)(_.id)
}

object Classess extends TableQuery(new Classess(_))
