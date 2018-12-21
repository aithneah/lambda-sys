package nea.lambdasys.db

import java.sql
import java.time._

import nea.lambdasys.core.domain.{ExerciseType, WeekParity}
import slick.jdbc.PostgresProfile.api._

trait ScalaTypesSupport {

  implicit val dayOfWeekColumnType = MappedColumnType.base[DayOfWeek, String](
    _.toString,
    DayOfWeek.valueOf,
  )

  implicit val weekParityColumnType = MappedColumnType.base[WeekParity, String](
    _.toString,
    s => WeekParity.fromString(s)
      .getOrElse(throw new IllegalArgumentException(s"Could not deserialize [$s] as week parity.")),
  )

  implicit val localTimeColumnType = MappedColumnType.base[LocalTime, sql.Time](
    sql.Time.valueOf,
    _.toLocalTime,
  )

  implicit val localDateColumnType = MappedColumnType.base[LocalDate, sql.Date](
    sql.Date.valueOf,
    _.toLocalDate,
  )

  implicit val durationColumnType = MappedColumnType.base[Duration, String](
    _.toString,
    Duration.parse,
  )

  implicit val localDateTimeColumnType = MappedColumnType.base[LocalDateTime, sql.Timestamp](
    sql.Timestamp.valueOf,
    _.toLocalDateTime,
  )

  implicit val exerciseTypeColumnType = MappedColumnType.base[ExerciseType, String](
    _.toString.toLowerCase,
    s => ExerciseType.fromString(s.capitalize)
      .getOrElse(throw new IllegalArgumentException(s"Could not deserialize [$s] as exercise type.")),
  )
}
