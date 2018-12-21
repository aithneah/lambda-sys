package nea.lambdasys.core.domain

import java.time.{DayOfWeek, LocalTime}

case class Group(id: String,
                 dayOfWeek: DayOfWeek,
                 weekParity: WeekParity,
                 classesTime: LocalTime,
                 studentIndexes: Seq[String])