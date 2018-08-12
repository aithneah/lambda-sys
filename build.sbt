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
  "com.typesafe.akka" %% "akka-http" % "10.1.3",
  "org.scalatest" %% "scalatest" % "3.0.5" % Test,
  "com.typesafe.slick" %% "slick" % "3.2.3",
  "io.spray" %% "spray-json" % "1.3.4"
)