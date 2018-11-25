package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.model.{Group, TutorViewOfStudent, List}
import spray.json.DefaultJsonProtocol._


class GroupApi extends Directives with SprayJsonSupport {

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
      }
    )
  }

  def getAllGroups(): Seq[Group] = Seq(
    Group("1", "Poniedziałek, TP 11:15", 18),
    Group("2", "Poniedziałek, TN 11:15", 16),
    Group("3", "Wtorek, TP 13:15", 17),
  )

  def getAllStudentsFromGroup(id: String): Seq[TutorViewOfStudent] = Seq(
    TutorViewOfStudent("228932", "Mariusz Kowalczyk"),
    TutorViewOfStudent("226715", "Anna Misiałek"),
    TutorViewOfStudent("216653", "Filip Nerta"),
    TutorViewOfStudent("225699", "Grzegorz Wapienny"),
  )

  def getAllGroupsLists(id: String): Seq[List] = Seq(
    List("Lista 1", "2018-10-01T15:15:00", 15),
    List("Lista 2", "2018-10-08T15:15:00", 18),
    List("Lista 3", "2018-10-15T15:15:00", 16),
    List("Lista 4", "2018-10-22T15:15:00", 18),
    List("Lista 5", "2018-10-29T15:15:00", 18),
  )

}
