package nea.lambdasys

import akka.actor.ActorSystem
import akka.event.Logging
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.HttpRequest
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.directives.LogEntry
import akka.stream.{ActorMaterializer, Materializer}

import scala.concurrent.ExecutionContext

object Main {

  implicit val system: ActorSystem = ActorSystem("my-system")
  implicit val materializer: Materializer = ActorMaterializer()
  implicit val executionContext: ExecutionContext = system.dispatcher

  def requestLog(request: HttpRequest): LogEntry =
    LogEntry(s"Incoming request ${request.method.value} -> " +
      s"${request.uri.path}${request.uri.rawQueryString.getOrElse("")}",
      Logging.InfoLevel)

  val route: Route = (ignoreTrailingSlash & logRequest(requestLog _)) {
    pathPrefix("api") {
      concat(
        path("assignments") {
          getFromResource("example_assignment.json")
        },
        (path("declarations") & parameters("group".as[String])) { group =>
          ???
        }
      )
    }
  }

  def main(args: Array[String]): Unit = {
    Http().bindAndHandle(route, "localhost", 8000)
    println(s"Server online at http://localhost:8000/")
  }

  // STUDENT'S ENDPOINTS:
    // GET all declarations
    // PUT declaration submit
    // PUT password reset

  // TUTOR'S ENDPOINTS:
    // POST add new student group (import group from excel)
    // GET all student groups
    // DELETE student group
    // POST student group
    // GET all declarations per group => in each declaration student's info and which exercises they did
}
