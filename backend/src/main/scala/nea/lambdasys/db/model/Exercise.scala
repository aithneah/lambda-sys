package nea.lambdasys.db.model

import nea.lambdasys.core.domain.ExerciseType

case class Exercise(id: Option[Int],
                    name: String,
                    ordinalNumber: Int,
                    `type`: ExerciseType,
                    contents: Option[String],
                    parentId: Option[Int],
                    assignmentId: Int)