package nea.lambdasys

import akka.actor.ActorSystem
import akka.stream.{ActorMaterializer, Materializer}
import com.typesafe.config.ConfigFactory
import nea.lambdasys.api.HttpService
import nea.lambdasys.core.{ClassesManager, DeclarationManager, GroupManager, StudentManager}
import nea.lambdasys.db.LambdaDb

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

object Main {

  def main(args: Array[String]): Unit = {
    val config = new LambdaSysConfig(ConfigFactory.defaultApplication())

    implicit val system: ActorSystem = ActorSystem("my-system")
    implicit val materializer: Materializer = ActorMaterializer()

    implicit val ec: ExecutionContext = scala.concurrent.ExecutionContext.global

    val db = new LambdaDb(config.dbConfig)

    if (config.recreateDb) (for {
      _ <- db.recreateSchema()
      _ <- db.initializeWithRandomData()
    } yield ()).onComplete {
      case Success(_) =>
        println("DB reinitialized successfully!")
      case Failure(exception) =>
        println("DB reinitialization failed.")
        exception.printStackTrace()
    }

    val declarationManager = new DeclarationManager(db)
    val groupManager = new GroupManager(db)
    val studentManager = new StudentManager(db)
    val classesManager = new ClassesManager(db)

    val httpService = new HttpService(config.httpServiceConfig)(
      declarationManager,
      groupManager,
      studentManager,
      classesManager
    )

    httpService.start()
    println(s"Server online at http://${config.httpServiceConfig.host}:${config.httpServiceConfig.port}/")
  }
}
