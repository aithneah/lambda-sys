package nea.lambdasys.core

import nea.lambdasys.core.domain.Group
import nea.lambdasys.db.LambdaDb

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class GroupManager(db: LambdaDb) {

  def getGroups()(implicit ec: ExecutionContext): Future[Seq[Group]] = async {
    val groupsWithStudentIndexes = await(db.getGroupsWithStudentIndexes())

    groupsWithStudentIndexes.map { case (group, indexes) =>
      Group(
        id = group.id,
        dayOfWeek = group.dayOfWeek,
        weekParity = group.weekParity,
        classesTime = group.classesTime,
        studentIndexes = indexes
      )
    }
  }
}
