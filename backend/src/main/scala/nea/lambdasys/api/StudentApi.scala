package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.api.model.{DeclarationStructure, StudentOverallProgress}
import nea.lambdasys.core.StudentManager
import spray.json.DefaultJsonProtocol

class StudentApi(students: StudentManager,
                 declarationApi: DeclarationApi) extends Directives
  with SprayJsonSupport
  with DefaultJsonProtocol {

  val route: Route = pathPrefix("students") {
      pathPrefix(Segment) { studentIndex =>
        concat(
          declarationApi.route(studentIndex),
          get { complete(getStudentOverallProgress(studentIndex)) }
        )
      }
  }

  import DeclarationStructure.{Node => DeclarationNode}
  import nea.lambdasys.api.model.DeclarationDegree._

  def getStudentOverallProgress(studentId: String): StudentOverallProgress =
    StudentOverallProgress("281233",
      "Mariusz Kowalczyk",
      "bad",
      64,
      Seq(95, 67, 30, 0, 13),
      DeclarationStructure(
        DeclarationNode("Lista 1", "list",
          DeclarationNode("Zadanie 1", "exercise", Not, Some(false),
            DeclarationNode("Podpunkt A", "subpoint", Not, Some(false),
              DeclarationNode("Scala", "lang",  Not, Some(false)),
              DeclarationNode("OCaml", "lang",  Not, Some(false))),
            DeclarationNode("Podpunkt B", "subpoint",  Not, Some(false))),
          DeclarationNode("Zadanie 2", "exercise",  Fully, Some(true), Some("bad"), Some("Student nie potrafił odpowiedzieć na pytania"))),
        DeclarationNode("Lista 2", "list",
          DeclarationNode("Zadanie 1", "exercise",  Partially, Some(true),
            DeclarationNode("Scala", "lang",  Fully, Some(true), Some("neutral"), Some("Student ok")),
            DeclarationNode("OCaml", "lang", Not, Some(false)))),
        DeclarationNode("Lista 3", "list",
          DeclarationNode("Zadanie 1", "exercise", Partially, Some(false),
            DeclarationNode("Podpunkt A", "subpoint", Not, Some(false),
              DeclarationNode("Scala", "lang", Not, Some(false)),
              DeclarationNode("OCaml", "lang", Not, Some(false))),
            DeclarationNode("Podpunkt B", "subpoint",  Fully, Some(false))),
          DeclarationNode("Zadanie 2", "exercise", Not, Some(false))),
        DeclarationNode("Lista 4", "list",
          DeclarationNode("Zadanie 1", "exercise", Not, Some(false),
            DeclarationNode("Scala", "lang", Not, Some(false)),
            DeclarationNode("OCaml", "lang", Not, Some(false))))
      )
    )

}
