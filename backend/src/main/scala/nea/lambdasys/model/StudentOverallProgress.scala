package nea.lambdasys.model

import spray.json._

case class StudentOverallProgress (index: String,
                                   name: String,
                                   overallNote: String,
                                   overallExercisesPercentage: String,
                                   listsPercentage: Seq[String],
                                   declarationStructure: DeclarationStructure)

object StudentOverallProgress {

  import DefaultJsonProtocol._

  implicit val format: RootJsonFormat[StudentOverallProgress] = jsonFormat6(StudentOverallProgress.apply)

}