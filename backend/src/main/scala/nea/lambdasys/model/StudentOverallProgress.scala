package nea.lambdasys.model

import spray.json._

case class StudentOverallProgress (index: String,
                                   name: String,
                                   overallNote: String,
                                   overallExercisesPercentage: Int,
                                   listsPercentage: Seq[Int],
                                   declarationStructure: DeclarationStructure)

object StudentOverallProgress {

  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[StudentOverallProgress] = jsonFormat6(StudentOverallProgress.apply)

}