package nea.lambdasys

import akka.actor.ActorSystem
import akka.stream.{ActorMaterializer, Materializer}
import com.typesafe.config.ConfigFactory
import nea.lambdasys.api.HttpService
import nea.lambdasys.db.{LambdaDb, Students}
import slick.jdbc.PostgresProfile.api._

object Main {

  def main(args: Array[String]): Unit = {
    val config = new LambdaSysConfig(ConfigFactory.defaultApplication())

    implicit val system: ActorSystem = ActorSystem("my-system")
    implicit val materializer: Materializer = ActorMaterializer()

    import system.dispatcher

    val db = Database.forConfig("", config.dbConfig)
//
//    db.run(LambdaDb.recreateSchema)
//      .onComplete(_ => system.terminate())

    val httpService = new HttpService(config.httpServiceConfig)

    httpService.start()
    println(s"Server online at http://${config.httpServiceConfig.host}:${config.httpServiceConfig.port}/")
  }
}
