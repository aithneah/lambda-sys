package nea.lambdasys.core.domain

import java.time.{Duration, LocalDate, LocalTime}

case class Classes(id: Int,
                   date: LocalDate,
                   time: LocalTime,
                   duration: Duration,
                   groupId: String,
                   assignments: Seq[Assignment])