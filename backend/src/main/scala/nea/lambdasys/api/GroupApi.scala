package nea.lambdasys.api

import java.time.format.{DateTimeFormatter, TextStyle}
import java.util.Locale

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.{DeclarationDegree, DeclarationStructure, Group, List, StudentSummaryOnClasses, TutorViewOfStudent}
import nea.lambdasys.api.model.DeclarationStructure.{Node => DeclarationNode}
import nea.lambdasys.core.{GroupManager, StudentManager}
import nea.lambdasys.core.domain.WeekParity
import spray.json.DefaultJsonProtocol._

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random

class GroupApi(students: StudentManager,
               groups: GroupManager)
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
      (get & path(Segment / "lists" / Segment / "summary")) { (groupId, listId) =>
        complete(getSummaryFor(groupId, listId))
      }
    )
  }

  def structure(list1: Int, list2: Int): DeclarationStructure = DeclarationStructure(
    DeclarationNode("Lista " + list1, "list",
      DeclarationNode("Zadanie 1", "exercise",
        DeclarationNode("Podpunkt A", "subpoint",
          DeclarationNode("Scala", "lang"),
          DeclarationNode("OCaml", "lang")),
        DeclarationNode("Podpunkt B", "subpoint")),
      DeclarationNode("Zadanie 2", "exercise")),
    DeclarationNode("Lista " + list2, "list",
      DeclarationNode("Zadanie 1", "exercise",
        DeclarationNode("Scala", "lang"),
        DeclarationNode("OCaml", "lang"))))

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

  def getAllGroupsLists(id: String): Seq[List] = Seq(
    List("01", "Lista 1", "2018-10-01T15:15:00", 15),
    List("02", "Lista 2", "2018-10-08T15:15:00", 18),
    List("03", "Lista 3", "2018-10-15T15:15:00", 16),
    List("04", "Lista 4", "2018-10-22T15:15:00", 18),
    List("05", "Lista 5", "2018-10-29T15:15:00", 18),
  )

  def getSummaryFor(groupId: String, listId: String): Future[Seq[StudentSummaryOnClasses]] = async {
    val lid = listId.toInt
    val (list1, list2) = ((lid - 1) / 2 * 2 + 1, (lid - 1) / 2 * 2 + 2)

    await(getAllStudentsFromGroup(groupId)).map(student => StudentSummaryOnClasses(
        index = student.index,
        name = student.name,
        answersCount = Random.nextInt(4),
        overallNote = "good",
        declarationStructure = randomizeDeclaration(structure(list1, list2))))
  }
}
