package nea.lambdasys.db.model

import java.time.{DayOfWeek, LocalTime}

import nea.lambdasys.core.domain.WeekParity

case class Group(id: String,
                 dayOfWeek: DayOfWeek,
                 weekParity: WeekParity,
                 classesTime: LocalTime)
