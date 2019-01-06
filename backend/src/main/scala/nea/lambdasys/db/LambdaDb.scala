package nea.lambdasys.db

import java.time.LocalDateTime

import com.typesafe.config.Config
import nea.lambdasys.DbGenerator
import nea.lambdasys.db.model._
import nea.lambdasys.db.tables._
import nea.lambdasys.util.CollectionExtensions._
import slick.jdbc.PostgresProfile.api._

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class LambdaDb(config: Config) {

  val db = Database.forConfig("", config)

  def recreateSchema()(implicit ec: ExecutionContext): Future[Unit] = {
    val schema = Students.schema ++
      Groups.schema ++
      Classess.schema ++
      Assignments.schema ++
      ClassesAssignments.schema ++
      Exercises.schema ++
      Declarations.schema ++
      DeclaredExercises.schema ++
      Comments.schema

    db.run(schema.drop.asTry >> schema.create)
  }

  def initializeWithRandomData()(implicit ec: ExecutionContext): Future[Unit] =
    db.run(DbGenerator.query)

  private def assignmentsAndExercisesByClassesId(classesId: Int) = for {
    classesAssignment <- ClassesAssignments
    if classesAssignment.assignmentId === classesId
    assignment <- Assignments
    if classesAssignment.assignmentId === assignment.id
    exercise <- Exercises
    if exercise.assignmentId === assignment.id
  } yield (assignment, exercise)

  def getDeclarationByClasses(classesId: Int)
                             (implicit ec: ExecutionContext): Future[Seq[(Assignment, Seq[Exercise])]] = async {
    val assignmentExercisePairs = await(db.run {
      (for {
        classesAssignment <- ClassesAssignments
        if classesAssignment.classesId === classesId
        assignment <- Assignments
        if classesAssignment.assignmentId === assignment.id
        exercise <- Exercises
        if exercise.assignmentId === assignment.id
      } yield (assignment, exercise)).result
    })

    assignmentExercisePairs.groupByMappingValues(_._1, _._2).toSeq
  }

  def getDeclarationByStudentAndClasses(studentIndex: String, classesId: Int)
                                       (implicit ec: ExecutionContext): Future[(Option[Declaration], Seq[(Assignment, Seq[(Exercise, Option[DeclaredExercise])])])] =
    async {
      val (declaration, assignmentExercisePairs) = await(db.run {
        for {
          declaration <- Declarations.filter(d => d.studentIndex === studentIndex && d.classesId === classesId)
            .result
            .headOption
          declarationId = declaration.flatMap(_.id).getOrElse(-1)
          declaredExs = DeclaredExercises filter (_.declarationId === declarationId)
          assignmentDeclaredExercisePairs <- (for {
            classesAssignment <- ClassesAssignments
            if classesAssignment.classesId === classesId
            assignment <- Assignments
            if classesAssignment.assignmentId === assignment.id
            (exercise, maybeDeclaredExercise) <- Exercises joinLeft declaredExs on (_.id === _.exerciseId)
            if exercise.assignmentId === assignment.id
          } yield (assignment, (exercise, maybeDeclaredExercise))).result
        } yield (declaration, assignmentDeclaredExercisePairs)
      })

      (declaration, assignmentExercisePairs.groupByMappingValues(_._1, _._2).toSeq)
    }

  def createOrUpdateDeclaration(studentIndex: String, classesId: Int, date: LocalDateTime, declaredExercises: Seq[Int])
                               (implicit ec: ExecutionContext): Future[Unit] =
    db.run {
      for {
        declaration <- (Declarations filter (d => d.classesId === classesId && d.studentIndex === studentIndex)).result.headOption
        declaration <- declaration.map(DBIO.successful)
          .getOrElse(Declarations.returning(Declarations) += Declaration(None, date, false, classesId, studentIndex))
        _ <- (DeclaredExercises filter (_.declarationId === declaration.id)).delete
        _ <- DeclaredExercises ++= declaredExercises.map(DeclaredExercise(None, declaration.id.get, _))
      } yield ()
    }

  def getClassesById(classesId: Int): Future[Option[Classes]] =
    db.run((Classess filter (_.id === classesId)).result.headOption)

  def getClassesByStudent(studentIndex: String): Future[Seq[Classes]] =
    db.run {
      (for {
        student <- Students
        if student.index === studentIndex
        group <- Groups
        if group.id === student.groupId
        classes <- Classess
        if classes.groupId === group.id
      } yield classes).result
    }

  def getGroupsWithStudentIndexes()(implicit ec: ExecutionContext): Future[Seq[(Group, Seq[String])]] = async {
    val groupStudentPairs = await(db.run {
      (for {
        group <- Groups
        student <- Students
        if student.groupId === group.id
      } yield (group, student.index)).result
    })

    groupStudentPairs.groupByMappingValues(_._1, _._2).toSeq
  }

  def getStudentsByGroup(groupId: String): Future[Seq[Student]] =
    db.run((Students filter (_.groupId === groupId)).result)

  def getStudentByIndex(index: String): Future[Option[(Student)]] =
    db.run((Students filter (_.index === index)).result.headOption)

  def getClassesWithAssignmentsByGroup(groupId: String)
                                      (implicit ec: ExecutionContext): Future[Seq[(Classes, Seq[Assignment])]] = async {
    val classesAssignmentPairs = await(db.run {
      (for {
        classes <- Classess
        if classes.groupId === groupId
        classesAssignment <- ClassesAssignments
        if classesAssignment.classesId === classes.id
        assignment <- Assignments
        if classesAssignment.assignmentId === assignment.id
      } yield (classes, assignment)).result
    })

    classesAssignmentPairs.groupByMappingValues(_._1, _._2).toSeq
  }

  def getDeclaredExereciseByStudentAndExercise(studentIndex: String, exerciseId: Int): Future[Option[DeclaredExercise]] =
    db.run {
      (for {
        declaredExercise <- DeclaredExercises
        if declaredExercise.exerciseId === exerciseId
        declaration <- Declarations
        if declaration.id === declaredExercise.declarationId &&
          declaration.studentIndex === studentIndex
      } yield declaredExercise).result.headOption
    }

  def updateOrCreateComment(comment: Comment): Future[Int] =
    db.run {
      Comments.insertOrUpdate(comment)
    }
}
