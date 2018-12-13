name := "lambda-sys"


lazy val commonSettings = Seq(
  version := "0.1",
  scalaVersion := "2.12.6"
)

lazy val root = (project in file("."))
  .settings(commonSettings)
  .aggregate(backend)

lazy val backend = (project in file("backend"))
  .settings(commonSettings)
  .settings(libraryDependencies ++= backendDependencies)

lazy val backendDependencies = Seq(
  "com.typesafe.akka" %% "akka-actor" % "2.5.15",
  "com.typesafe.akka" %% "akka-stream" % "2.5.15",
  "com.typesafe.akka" %% "akka-http" % "10.1.3",
  "ch.megard" %% "akka-http-cors" % "0.3.1",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.1.3",
  "org.scalatest" %% "scalatest" % "3.0.5" % Test,
  "com.typesafe.slick" %% "slick" % "3.2.3",
  "io.spray" %% "spray-json" % "1.3.4",
  "postgresql" % "postgresql" % "9.1-901.jdbc4",
  "org.slf4j" % "slf4j-nop" % "1.6.4",
)