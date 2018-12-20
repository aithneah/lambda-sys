package nea.lambdasys.db.model

import java.time.{DayOfWeek, LocalTime}

case class Group(id: String,
                 dayOfWeek: DayOfWeek,
                 weekParity: WeekParity,
                 classesTime: LocalTime)
