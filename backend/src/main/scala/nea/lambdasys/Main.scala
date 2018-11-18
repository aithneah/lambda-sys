package nea.lambdasys

import akka.actor.ActorSystem
import akka.stream.{ActorMaterializer, Materializer}
import com.typesafe.config.ConfigFactory
import nea.lambdasys.api.HttpService

object Main {

  def main(args: Array[String]): Unit = {
    val config = new LambdaSysConfig(ConfigFactory.defaultApplication())

    implicit val system: ActorSystem = ActorSystem("my-system")
    implicit val materializer: Materializer = ActorMaterializer()

    val httpService = new HttpService(config.httpServiceConfig)

    httpService.start()
    println(s"Server online at http://${config.httpServiceConfig.host}:${config.httpServiceConfig.port}/")
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
