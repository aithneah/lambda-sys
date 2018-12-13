package nea.lambdasys.domain

case class Exercise(id: Option[Int],
                    name: String,
                    ordinalNumber: Int,
                    contents: Option[String],
                    parentId: Option[Int],
                    assignmentId: Int)