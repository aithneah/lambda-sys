package nea.lambdasys.model

import spray.json._

case class StudentSummaryOnClasses(index: String,
                                   name: String,
                                   answersCount: Int,
                                   overallNote: String,
                                   declarationStructure: DeclarationStructure)

object StudentSummaryOnClasses {

  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[StudentSummaryOnClasses] = jsonFormat5(StudentSummaryOnClasses.apply)
}
