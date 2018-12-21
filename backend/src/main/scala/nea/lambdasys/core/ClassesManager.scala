package nea.lambdasys.core

import java.time.{Duration, LocalDate, LocalTime}

import nea.lambdasys.core.domain.{Assignment, Classes}
import nea.lambdasys.db.LambdaDb

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class ClassesManager(db: LambdaDb) {

  def getClassesByGroup(groupId: String)
                       (implicit ec: ExecutionContext): Future[Seq[Classes]] = async {
    val classesWithAssignments = await(db.getClassesWithAssignmentsByGroup(groupId))

    classesWithAssignments.map { case (classes, assignments) =>
      Classes(
        id = classes.id.get,
        date = classes.date,
        time = classes.time,
        duration = classes.duration,
        groupId = classes.groupId,
        assignments = assignments.map(a => Assignment(
          id = a.id.get,
          name = a.name,
          ordinalNumber = a.ordinalNumber,
          exercises = Seq()
        ))
      )
    }
  }
}
