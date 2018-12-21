package nea.lambdasys.core

import java.time.LocalDateTime

import nea.lambdasys.core.domain.{Assignment, Declaration, Exercise}
import nea.lambdasys.db.tables.DeclaredExercises
import nea.lambdasys.db.{LambdaDb, model => dbm}

import scala.async.Async._
import scala.concurrent.{ExecutionContext, Future}

class DeclarationManager(db: LambdaDb) {

  private def createAssignment(assignment: dbm.Assignment,
                               exercises: Seq[(dbm.Exercise, Option[dbm.DeclaredExercise])]): Assignment = {
    val exercisesByParent = exercises.groupBy { case (exercise, _) => exercise.parentId }

    def nestExercises(parentId: Option[Int]): Seq[Exercise] =
      exercisesByParent.get(parentId).toSeq.flatten.map { case (exercise, declaredExercise) =>
        Exercise(
          id = exercise.id.get,
          name = exercise.name,
          ordinalNumber = exercise.ordinalNumber,
          `type` = exercise.`type`,
          isDeclared = declaredExercise.isDefined,
          contents = exercise.contents,
          children = nestExercises(Some(exercise.id.get))
        )
      }

    Assignment(
      id = assignment.id.get,
      ordinalNumber = assignment.ordinalNumber,
      name = assignment.name,
      exercises = nestExercises(None)
    )
  }

  def getDeclaration(studentIndex: String, classesId: Int)
                    (implicit ec: ExecutionContext): Future[Option[Declaration]] = async {
    val maybeClasses = await(db.getClassesById(classesId))
    val (maybeDeclaration, assignmentDeclaredExercisePair) = await(db.getDeclarationByStudentAndClasses(studentIndex, classesId))

    maybeClasses.map { classes =>
      Declaration(
        id = maybeDeclaration.map(_.id.get),
        studentIndex,
        classesId,
        submitted = maybeDeclaration.map(_.submitted),
        isCancelled = maybeDeclaration.map(_.isCancelled).getOrElse(false),
        assignments = assignmentDeclaredExercisePair.map((createAssignment _).tupled)
      )
    }
  }

  def getDeclarations(studentIndex: String)
                     (implicit ec: ExecutionContext): Future[Seq[Declaration]] = async {
    val studentsClasses = await(db.getClassesByStudent(studentIndex))

    await(Future.sequence(studentsClasses.map(c => getDeclaration(studentIndex, c.id.get)))).flatten
  }

  private def extractDeclaredExercises(assignment: Assignment): Seq[Exercise] = {

    def extractFromChild(exercise: Exercise): Seq[Exercise] =
      if (exercise.children.isEmpty && exercise.isDeclared) Seq(exercise)
      else exercise.children.flatMap(extractFromChild)

    assignment.exercises.flatMap(extractFromChild)
  }

  def updateDeclaration(studentIndex: String, classesId: Int, declaration: Declaration)
                       (implicit ec: ExecutionContext): Future[Unit] = async {
    val declaredExercises = declaration.assignments.flatMap(extractDeclaredExercises _)

    await(db.createOrUpdateDeclaration(studentIndex, classesId, LocalDateTime.now(), declaredExercises.map(_.id)))
  }
}
