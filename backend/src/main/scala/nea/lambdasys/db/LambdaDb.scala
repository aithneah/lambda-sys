package nea.lambdasys.db

import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext

object LambdaDb {

  def recreateSchema(implicit ec: ExecutionContext) = {
    val schema = Students.schema ++
      Groups.schema ++
      Classess.schema ++
      Assignments.schema ++
      ClassesAssignments.schema ++
      Exercises.schema

    schema.drop
  }
}
