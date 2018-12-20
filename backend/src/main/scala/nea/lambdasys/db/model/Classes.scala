package nea.lambdasys.db.model

import java.time.{Duration, LocalDate, LocalTime}

case class Classes(id: Option[Int],
                   date: LocalDate,
                   time: LocalTime,
                   duration: Duration,
                   groupId: String)