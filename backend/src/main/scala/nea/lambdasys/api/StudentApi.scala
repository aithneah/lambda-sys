package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.model.{DeclarationStructure, StudentOverallProgress}
import spray.json.DefaultJsonProtocol

class StudentApi extends Directives with SprayJsonSupport with DefaultJsonProtocol {

  val route: Route = pathPrefix("students") {
    (get & path(Segment)) { studentId => complete(getStudentOverallProgress(studentId)) }
  }

  import DeclarationStructure.{Node => DeclarationNode}

  def getStudentOverallProgress(studentId: String): StudentOverallProgress =
    StudentOverallProgress("281233",
      "Mariusz Kowalczyk",
      "bad",
      64,
      Seq(95, 67, 30, 0, 13),
      DeclarationStructure(
        DeclarationNode("Lista 1", "list",
          DeclarationNode("Zadanie 1", "exercise", "not", Some(false),
            DeclarationNode("Podpunkt A", "subpoint", "not", Some(false),
              DeclarationNode("Scala", "lang",  "not", Some(false)),
              DeclarationNode("OCaml", "lang",  "not", Some(false))),
            DeclarationNode("Podpunkt B", "subpoint",  "not", Some(false))),
          DeclarationNode("Zadanie 2", "exercise",  "fully", Some(true), Some("bad"), Some("Student nie potrafił odpowiedzieć na pytania"))),
        DeclarationNode("Lista 2", "list",
          DeclarationNode("Zadanie 1", "exercise",  "partially", Some(true),
            DeclarationNode("Scala", "lang",  "fully", Some(true), Some("neutral"), Some("Student ok")),
            DeclarationNode("OCaml", "lang", "not", Some(false)))),
        DeclarationNode("Lista 3", "list",
          DeclarationNode("Zadanie 1", "exercise", "partially", Some(false),
            DeclarationNode("Podpunkt A", "subpoint", "not", Some(false),
              DeclarationNode("Scala", "lang", "not", Some(false)),
              DeclarationNode("OCaml", "lang", "not", Some(false))),
            DeclarationNode("Podpunkt B", "subpoint",  "fully", Some(false))),
          DeclarationNode("Zadanie 2", "exercise", "not", Some(false))),
        DeclarationNode("Lista 4", "list",
          DeclarationNode("Zadanie 1", "exercise", "not", Some(false),
            DeclarationNode("Scala", "lang", "not", Some(false)),
            DeclarationNode("OCaml", "lang", "not", Some(false))))
      )
    )

}
