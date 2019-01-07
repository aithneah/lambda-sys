package nea.lambdasys.api

import akka.actor.ActorSystem
import akka.event.Logging
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{HttpMethods, HttpRequest}
import akka.http.scaladsl.server.directives.LogEntry
import akka.http.scaladsl.server.{Directives, Route}
import akka.stream.Materializer
import ch.megard.akka.http.cors.scaladsl.CorsDirectives
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings
import nea.lambdasys.core._

import scala.concurrent.{ExecutionContext, Future}

class HttpService(config: HttpServiceConfig)
                 (declarations: DeclarationManager,
                  groups: GroupManager,
                  students: StudentManager,
                  classes: ClassesManager,
                  comments: CommentManager)
                 (implicit system: ActorSystem,
                  materializer: Materializer,
                  ec: ExecutionContext) extends Directives with CorsDirectives {

  private val accountApi = new AccountApi(students, groups)
  private val declarationApi = new DeclarationApi(declarations, classes)
  private val groupApi = new GroupApi(students, groups, classes, declarations, comments, declarationApi)
  private val studentApi = new StudentApi(students, declarations, comments, declarationApi)

  def requestLog(request: HttpRequest): LogEntry =
    LogEntry(s"Incoming request ${request.method.value} -> " +
      s"${request.uri.path}${request.uri.rawQueryString.getOrElse("")}\n${request.entity}",
      Logging.InfoLevel)

  val corsSettings = CorsSettings.defaultSettings
    .withAllowedMethods(CorsSettings.defaultSettings.allowedMethods :+ HttpMethods.DELETE)

  val route: Route = (cors(corsSettings) & logRequest(requestLog _) & pathPrefix("api")) {
    concat(
      accountApi.route,
      groupApi.route,
      studentApi.route
    )
  }

  def start(): Future[Http.ServerBinding] =
    Http().bindAndHandle(route, config.host, config.port)
}
