package nea.lambdasys.core

import nea.lambdasys.core.domain.Student
import nea.lambdasys.db.LambdaDb

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class StudentManager(db: LambdaDb) {

  def getStudentsByGroup(groupId: String)(implicit ec: ExecutionContext): Future[Seq[Student]] = async {
    await(db.getStudentsByGroup(groupId)).map { student =>
      Student(
        index = student.index,
        name = student.name,
        surname = student.surname,
        groupId = student.groupId
      )
    }
  }
}
