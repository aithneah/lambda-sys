package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.model.Group
import spray.json.DefaultJsonProtocol._


class GroupApi extends Directives with SprayJsonSupport {

  val route: Route = pathPrefix("groups") {
    (get & pathEnd) {
      complete(getAllGroups())
    }
  }

  def getAllGroups(): Seq[Group] = Seq(
    Group("1", "Poniedziałek, TP 11:15", 18),
    Group("2", "Poniedziałek, TN 11:15", 16),
    Group("3", "Wtorek, TP 13:15", 17),
  )

}
