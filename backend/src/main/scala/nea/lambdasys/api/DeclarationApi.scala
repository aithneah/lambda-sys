package nea.lambdasys.api

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.server.{Directives, Route}
import nea.lambdasys.model.{DeclarationStructure, StudentViewOfDeclaration}
import spray.json.DefaultJsonProtocol

class DeclarationApi extends Directives with SprayJsonSupport with DefaultJsonProtocol {

  val route: Route = pathPrefix("declarations") {
    concat(
      (get & pathEnd) {
        complete(getStudentsDeclarations())
      },
      (get & path(Segment / "structure")) { classesId => complete(getDeclarationStructure(classesId)) },
    )
  }

  def getStudentsDeclarations(): Seq[StudentViewOfDeclaration] =
    Seq(
      StudentViewOfDeclaration(
        lists = Seq("Lista 3", "Lista 4"),
        classesId = "2",
        classesDate = "2018-11-21T15:15:00",
        completionDate = None
      ),
      StudentViewOfDeclaration(
        lists = Seq("Lista 1", "Lista 2"),
        classesId = "1",
        classesDate = "2018-11-21T15:15:00",
        completionDate = Some("2018-11-14T15:12:32")
      )
    )

  import DeclarationStructure.{Node => DeclarationNode}

  def getDeclarationStructure(classesId: String): DeclarationStructure =
    DeclarationStructure(
      DeclarationNode("Lista 3", "list",
        DeclarationNode("Zadanie 1", "exercise",
          DeclarationNode("Podpunkt A", "subpoint",
            DeclarationNode("Scala", "lang"),
            DeclarationNode("OCaml", "lang")),
          DeclarationNode("Podpunkt B", "subpoint")),
        DeclarationNode("Zadanie 2", "exercise")),
      DeclarationNode("Lista 4", "list",
        DeclarationNode("Zadanie 1", "exercise",
          DeclarationNode("Scala", "lang"),
          DeclarationNode("OCaml", "lang")))
    )
}
