package nea.lambdasys.api

import java.time.LocalDateTime

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.DeclarationStructure.{Node => DeclarationNode}
import nea.lambdasys.api.model._
import nea.lambdasys.core.{ClassesManager, DeclarationManager, GroupManager, StudentManager}
import spray.json.DefaultJsonProtocol._

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random

class GroupApi(students: StudentManager,
               groups: GroupManager,
               classes: ClassesManager,
               declarations: DeclarationManager,
               declarationApi: DeclarationApi)
              (implicit ec: ExecutionContext) extends Directives
  with SprayJsonSupport {

  val route: Route = pathPrefix("groups") {
    concat(
      (get & pathEnd) {
        complete(getAllGroups())
      },
      (get & path(Segment / "students")) { groupId =>
        complete(getAllStudentsFromGroup(groupId))
      },
      (get & path(Segment / "lists")) { groupId =>
        complete(getAllGroupsLists(groupId))
      },
      (get & path(Segment / "lists" / IntNumber / "summary")) { (groupId, listId) =>
        complete(getSummaryFor(groupId, listId))
      }
    )
  }

  def randomizeDeclaration(declarationStructure: DeclarationStructure): DeclarationStructure = {
    def aux(node: DeclarationNode): DeclarationNode =
      if (node.children.isEmpty) {
        val isDeclared = Seq(DeclarationDegree.Not, DeclarationDegree.Fully)(Random.nextInt(2))
        node.copy(isDeclared = isDeclared, isChecked = if (isDeclared != DeclarationDegree.Not) Some(Random.nextBoolean()) else Some(false))
      }
      else {
        val children = node.children.map(aux)
        val isDeclared = children.map(_.isDeclared).reduce(_ | _)
        val isChecked = children.map(_.isChecked.get).reduce(_ || _)

        node.copy(children = children, isDeclared = isDeclared, isChecked = Some(isChecked))
      }

    DeclarationStructure(declarationStructure.structure.map(aux): _*)
  }

  def getAllGroups(): Future[Seq[Group]] = async {
    await(groups.getGroups())
      .sortBy(g => (g.dayOfWeek, g.classesTime, g.weekParity))
      .map { g =>

        Group(g.id, CustomFormats.formatClassesDate(g.dayOfWeek, g.weekParity, g.classesTime), g.studentIndexes.size)
      }
  }

  def getAllStudentsFromGroup(groupId: String): Future[Seq[TutorViewOfStudent]] = async {
    await(students.getStudentsByGroup(groupId))
      .sortBy(s => (s.surname, s.name))
      .map { student =>
        TutorViewOfStudent(
          index = student.index,
          name = s"${student.name} ${student.surname}"
        )
      }
  }

  def getAllGroupsLists(id: String)(implicit ec: ExecutionContext): Future[Seq[Assignment]] = async {
    val classesWithAssignments = await(classes.getClassesByGroup(id))

    for {
      classes <- classesWithAssignments.sortBy(_.date.toEpochDay)
      assignment <- classes.assignments.sortBy(_.ordinalNumber)
    } yield Assignment(
      id = assignment.id,
      name = assignment.name,
      classesDate = LocalDateTime.of(classes.date, classes.time).toString,
      numberOfDeclarations = Random.nextInt(18)
    )
  }

  def getSummaryFor(groupId: String, listId: Int): Future[Seq[StudentSummaryOnClasses]] = async {
    val currentClasses = await(classes.getClassesByGroup(groupId))
      .find(_.assignments.exists(_.id == listId)).get
    val studentsFromGroup = await(getAllStudentsFromGroup(groupId))

    await(Future.sequence(studentsFromGroup.map { student => async {
      val declaration = await(declarations.getDeclaration(student.index, currentClasses.id)).get

      StudentSummaryOnClasses(
        index = student.index,
        name = student.name,
        answersCount = Random.nextInt(4),
        overallNote = Seq("good", "neutral", "bad")(Random.nextInt(3)),
        declarationStructure = DeclarationStructure(declaration.assignments.map(declarationApi.makeAssignmentNode): _*))
    }}))
  }
}
