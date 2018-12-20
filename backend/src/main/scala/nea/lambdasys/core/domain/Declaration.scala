package nea.lambdasys.core.domain

import java.time.LocalDateTime

case class Declaration(id: Option[Int],
                       studentIndex: String,
                       classesId: Int,
                       submitted: Option[LocalDateTime],
                       isCancelled: Boolean,
                       assignments: Seq[Assignment])