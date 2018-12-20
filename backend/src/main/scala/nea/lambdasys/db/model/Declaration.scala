package nea.lambdasys.db.model

import java.time.LocalDateTime

case class Declaration(id: Option[Int],
                       submitted: LocalDateTime,
                       isCancelled: Boolean,
                       classesId: Int,
                       studentIndex: String)