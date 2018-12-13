package nea.lambdasys.domain

import java.time.LocalDateTime

case class Declaration(id: Option[Int],
                       submitted: LocalDateTime,
                       isCancelled: Boolean,
                       classesId: Int,
                       studentIndex: String)