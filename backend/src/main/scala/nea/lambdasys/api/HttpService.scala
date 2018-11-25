package nea.lambdasys.api

import akka.actor.ActorSystem
import akka.event.Logging
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.HttpRequest
import akka.http.scaladsl.server.directives.LogEntry
import akka.http.scaladsl.server.{Directives, Route}
import akka.stream.Materializer
import ch.megard.akka.http.cors.scaladsl.CorsDirectives

import scala.concurrent.Future

class HttpService(config: HttpServiceConfig)
                 (implicit system: ActorSystem, materializer: Materializer) extends Directives with CorsDirectives {

  private val accountApi = new AccountApi()
  private val declarationApi = new DeclarationApi()
  private val groupApi = new GroupApi()
  private val studentApi = new StudentApi()

  def requestLog(request: HttpRequest): LogEntry =
    LogEntry(s"Incoming request ${request.method.value} -> " +
      s"${request.uri.path}${request.uri.rawQueryString.getOrElse("")}",
      Logging.InfoLevel)

  val route: Route = (cors() & logRequest(requestLog _) & pathPrefix("api")) {
    concat(
      accountApi.route,
      declarationApi.route,
      groupApi.route,
      studentApi.route
    )
  }

  def start(): Future[Http.ServerBinding] =
    Http().bindAndHandle(route, config.host, config.port)
}
