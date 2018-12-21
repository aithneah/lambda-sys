package nea.lambdasys.db

import com.typesafe.config.Config
import nea.lambdasys.DbGenerator
import nea.lambdasys.db.model._
import nea.lambdasys.db.tables._
import slick.jdbc.PostgresProfile.api._
import nea.lambdasys.util.CollectionExtensions._

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
      DeclaredExercises.schema

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
}
