package nea.lambdasys

import java.time.temporal.WeekFields
import java.time.{DayOfWeek, Duration, LocalDate, LocalTime}

import nea.lambdasys.core.domain.{ExerciseType, WeekParity}
import nea.lambdasys.db.model._
import nea.lambdasys.db.tables._
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.ExecutionContext
import scala.util.Random

object DbGenerator {

  def query(implicit ec: ExecutionContext) = for {
    groups <- Groups.returning(Groups) ++= generateGroups()
    _ <- Students ++= generateRandomStudents(groups.map(_.id)).take(30)
    classess <- Classess.returning(Classess) ++= groups.flatMap(group => generateClasses(group))
    assignments <- Assignments.returning(Assignments) ++= generateAssignments(numberOfAssignments = classess.size)
    _ <- ClassesAssignments ++= assignAssignmentsToClasses(assignments, classess)
    exercises <- Exercises.returning(Exercises) ++= generateRandomExercises(assignments)
    (exercisesWithSubpoints, exercisesWithoutSubpoints) = exercises.partition(_ => Random.nextDouble > 0.5)
    subpoints <- Exercises.returning(Exercises) ++= generateRandomSubpoints(exercisesWithSubpoints)
    _ <- Exercises ++= generateRandomLanguages(exercisesWithoutSubpoints ++ subpoints)
  } yield ()

  private def generateGroups(): Seq[Group] = Seq(
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

  private def generateAssignments(numberOfAssignments: Int): Seq[Assignment] =
    (1 to numberOfAssignments).map(i => Assignment(None, i, s"Lista $i"))

  private def assignAssignmentsToClasses(assignments: Seq[Assignment],
                                         classes: Seq[Classes]): Seq[ClassesAssignment] =
    (for {
      (groupId, groupClasses) <- classes.groupBy(_.groupId)
      assignmentsPerClasses = math.ceil(assignments.size.toDouble / groupClasses.size).toInt
      (classesAssignments, singleClasses) <- assignments.grouped(assignmentsPerClasses).zip(groupClasses.toIterator)
      classesAssignment <- classesAssignments
    } yield ClassesAssignment(singleClasses.id.get, classesAssignment.id.get)).toSeq

  private def generateRandomExercises(assignments: Seq[Assignment]): Seq[Exercise] = for {
    assignment <- assignments
    exerciseOrdinalNumber <- 1 to 3 + Random.nextInt(3)
  } yield Exercise(None, s"Zadanie $exerciseOrdinalNumber", exerciseOrdinalNumber, ExerciseType.Exercise,
    None, None, assignment.id.get)

  private def generateRandomSubpoints(exercises: Seq[Exercise]): Seq[Exercise] = for {
    exercise <- exercises
    subpointOrdinalNumber <- 1 to (1 + Random.nextInt(4))
    subpointLetter = ('A' + subpointOrdinalNumber - 1).toChar
  } yield Exercise(None, s"Podpunkt $subpointLetter", subpointOrdinalNumber, ExerciseType.Subpoint,
    None, Some(exercise.id.get), exercise.assignmentId)

  private def generateRandomLanguages(subpoints: Seq[Exercise]): Seq[Exercise] = for {
    subpoint <- subpoints
    languageOrdinalNumber <- 1 to Random.nextInt(2) * 2
    languageName = languageOrdinalNumber match {
      case 1 => "Scala"
      case 2 => "OCaml"
    }
  } yield Exercise(None, languageName, languageOrdinalNumber, ExerciseType.Language,
    None, Some(subpoint.id.get), subpoint.assignmentId)
}
