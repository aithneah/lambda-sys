package nea.lambdasys.db.tables

import nea.lambdasys.db.model.Student
import slick.jdbc.PostgresProfile.api._

class Students(tag: Tag) extends Table[Student](tag, "STUDENTS") {

  def index = column[String]("INDEX", O.PrimaryKey)

  def name = column[String]("NAME")

  def surname = column[String]("SURNAME")

  def groupId = column[String]("GROUP_ID")

  def * = (index, name, surname, groupId) <> (Student.tupled, Student.unapply)

  def group = foreignKey("GROUP_FK", groupId, Groups)(_.id)
}

object Students extends TableQuery(new Students(_)) {


}
