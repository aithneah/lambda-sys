package nea.lambdasys.core.domain

case class Exercise(id: Int,
                    name: String,
                    ordinalNumber: Int,
                    `type`: ExerciseType,
                    isDeclared: Boolean,
                    contents: Option[String],
                    children: Seq[Exercise])