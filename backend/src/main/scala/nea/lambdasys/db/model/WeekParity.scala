package nea.lambdasys.db.model

sealed trait WeekParity {

  def toInt: Int
}

object WeekParity {

  case object Odd extends WeekParity {

    override def toInt: Int = 1
  }

  case object Even extends WeekParity {

    override def toInt: Int = 0
  }

  def fromString(str: String): Option[WeekParity] = str match {
    case "Odd" => Some(Odd)
    case "Even" => Some(Even)
    case _ => None
  }
}
