package nea.lambdasys

import java.time.temporal.{IsoFields, WeekFields}
import java.time.{DayOfWeek, Duration, LocalDate, LocalTime}

import nea.lambdasys.db.{Classess, Groups, Students}
import nea.lambdasys.domain.{Classes, Group, Student, WeekParity}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext
import scala.util.Random

object DbGenerator {

  def query(implicit ec: ExecutionContext) = for {
    groups <- Groups.returning(Groups) ++= Seq(
      Group(
        id = "Z01-22a",
        dayOfWeek = DayOfWeek.MONDAY,
        weekParity = WeekParity.Even,
        classesTime = LocalTime.of(9, 15)
      ),
      Group(
        id = "Z01-22b",
        dayOfWeek = DayOfWeek.MONDAY,
        weekParity = WeekParity.Odd,
        classesTime = LocalTime.of(9, 15)
      ),
    )
    _ <- Students ++= generateRandomStudents(groups.map(_.id)).take(30)
    _ <- Classess ++= groups.flatMap(group => generateClasses(group))
  } yield ()

  private val names = Seq("Marcin", "Filip", "Przemysław", "Tymoteusz", "Wiktoria", "Mirosława", "Aniela",
    "Stefania", "Grażyna", "Kalina", "Marianna", "Katarzyna", "Rafał", "Janina", "Kamil", "Łukasz", "Mateusz", "Karolina",
    "Weronika", "Matylda", "Dariusz", "Piotr", "Paweł", "Amadeusz", "Jakub", "Grzegorz", "Justyna", "Anna", "Katarzyna")

  private val surnames = Seq("Miszek", "Rapek", "Kozłowska", "Bilińska", "Danek", "Opolski", "Nadej",
    "Lubilak", "Krypes", "Gazołek", "Morowski", "Bęckowski", "Bitny", "Czekaj",
    "Jowialik", "Bareczek", "Nowak", "Kowalski", "Wiśniewski", "Wójcik", "Błotny",
    "Kowalczyk", "Kamiński", "Woźniak", "Szymański", "Dąbrowski",
    "Kozioł", "Kaczka", "Krawczyk", "Lupa", "Osmański", "Barek",
    "Grabowski", "Okoń", "Jagiełło", "Miszek", "Kaban", "Ołtarz",
    "Małpa", "Tutek", "Korek", "Makak", "Opierski", "Papaj",
    "Szczypiek", "Omam", "Wierciński", "Waśko", "Wolak",
    "Zrzęda", "Paproch", "Czepek", "Trąba", "Hula", "Drzemczyk", "Cupek", "Marasz", "Ploszek", "Lasota", "Rancik",
    "Kosowski", "Kozioł", "Patos", "Ferniewicz", "Kot", "Myszowski", "Starzec", "Szczepanik", "Nochal")

  private def generateUniqueIndices(): Stream[String] = Stream
    .continually {
      (1 to 6).map(_ => Random.nextInt(9) + 1).mkString
    }
    .distinct

  private def generateRandomStudent(index: String, availableGroups: Seq[String]): Student = Student(
    index = index,
    name = names(Random.nextInt(names.size)),
    surname = surnames(Random.nextInt(surnames.size)),
    groupId = availableGroups(Random.nextInt(availableGroups.size))
  )

  private def generateRandomStudents(availableGroups: Seq[String]): Stream[Student] =
    generateUniqueIndices().map(index => generateRandomStudent(index, availableGroups))

  private def generateClasses(group: Group): Seq[Classes] =
    Stream.iterate(LocalDate.of(2018, 10, 1))(date => date.plusDays(1))
      .takeWhile(date => date.isBefore(LocalDate.of(2019, 2, 1)))
      .filter(date => date.getDayOfWeek == group.dayOfWeek)
      .filter(date => date.get(WeekFields.ISO.weekOfWeekBasedYear()) % 2 == group.weekParity.toInt)
      .map(date => Classes(None, date, group.classesTime, Duration.ofMinutes(90), group.id))
}
