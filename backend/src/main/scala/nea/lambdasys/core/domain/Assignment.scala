package nea.lambdasys.core.domain

case class Assignment(id: Int,
                      ordinalNumber: Int,
                      name: String,
                      exercises: Seq[Exercise])