package nea.lambdasys

import akka.actor.ActorSystem
import akka.stream.{ActorMaterializer, Materializer}
import com.typesafe.config.ConfigFactory
import nea.lambdasys.api.HttpService
import nea.lambdasys.core.DeclarationManager
import nea.lambdasys.db.LambdaDb

import scala.util.{Failure, Success}

object Main {

  def main(args: Array[String]): Unit = {
    val config = new LambdaSysConfig(ConfigFactory.defaultApplication())

    implicit val system: ActorSystem = ActorSystem("my-system")
    implicit val materializer: Materializer = ActorMaterializer()

    import system.dispatcher

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

    val httpService = new HttpService(config.httpServiceConfig)(
      declarationManager
    )

    httpService.start()
    println(s"Server online at http://${config.httpServiceConfig.host}:${config.httpServiceConfig.port}/")
  }
}
