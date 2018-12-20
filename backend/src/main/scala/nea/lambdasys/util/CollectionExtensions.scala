package nea.lambdasys.util

import scala.collection.generic.CanBuildFrom
import scala.collection.{TraversableLike, immutable, mutable}

object CollectionExtensions {

  implicit class RichTraversableLike[+A, +Repr](value: TraversableLike[A, Repr]) {

    def groupByMappingValues[K, V, That](fk: A => K, fv: A => V)
                                     (implicit bf: CanBuildFrom[Repr, V, That]): immutable.Map[K, That] = {
      val m = mutable.Map.empty[K, mutable.Builder[V, That]]

      for (elem <- value) {
        val key = fk(elem)
        val bldr = m.getOrElseUpdate(key, bf())
        bldr += fv(elem)
      }

      val b = immutable.Map.newBuilder[K, That]

      for ((k, v) <- m)
        b += ((k, v.result))

      b.result
    }
  }
}
