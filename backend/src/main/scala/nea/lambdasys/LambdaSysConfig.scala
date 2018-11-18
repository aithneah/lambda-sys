package nea.lambdasys

import com.typesafe.config.Config
import nea.lambdasys.api.HttpServiceConfig

class LambdaSysConfig(raw: Config) {

  val httpServiceConfig: HttpServiceConfig = new HttpServiceConfig(raw.getConfig("http-service"))
}
