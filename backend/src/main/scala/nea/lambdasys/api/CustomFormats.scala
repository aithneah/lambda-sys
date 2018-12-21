package nea.lambdasys.api

import java.time.format.{DateTimeFormatter, TextStyle}
import java.time.{DayOfWeek, LocalTime}
import java.util.Locale

import nea.lambdasys.core.domain.WeekParity

object CustomFormats {

  def formatClassesDate(dayOfWeek: DayOfWeek,
                        weekParity: WeekParity,
                        classesTime: LocalTime): String = {
    val dow = dayOfWeek.getDisplayName(TextStyle.FULL, Locale.forLanguageTag("pl"))
    val wp = weekParity match {
      case WeekParity.Even => "TP"
      case WeekParity.Odd => "TN"
    }
    val ct = classesTime.format(DateTimeFormatter.ofPattern("HH:mm"))

    s"$dow, $wp $ct"
  }
}
