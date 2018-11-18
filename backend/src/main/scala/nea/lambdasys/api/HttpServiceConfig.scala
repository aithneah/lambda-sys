package nea.lambdasys.api

import com.typesafe.config.Config

class HttpServiceConfig(raw: Config) {

  val host: String = raw.getString("host")

  val port: Int = raw.getInt("port")
}
