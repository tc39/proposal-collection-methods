# New collections (Set and Map) methods

See [formal spec WIP](https://tc39.github.io/proposal-collection-methods/).

# (Semi)relevant previous discussions

* [Map#map and Map#filter](https://github.com/tc39/ecma262/pull/13)
* [Map.prototype.map and Map.prototype.filter (spec) + Set](https://esdiscuss.org/notes/2014-11-19)
* [Map: filter/map and more](https://esdiscuss.org/topic/map-filter-map-and-more)
* [Original topic regarding this proposal](https://esdiscuss.org/topic/new-set-prototype-methods)
* [Newer topic regarding this proposal](https://esdiscuss.org/topic/new-set-methods-again)


# Motivations

* it's consistent with already familiar and *widely used* `Array` API (reduced cognitive overhead)
  * easier refactoring
  * certain function become generic
* reduces boilerplate code when dealing with common collection use cases
* no new syntax
* allow developers coming from other languages to use familiar APIs

# Adoption

**TBA**


## Quick reference for other languages similar data structures

### Set

* [C# `HashSet`](https://msdn.microsoft.com/en-us/library/bb359438.aspx)
* [F# - Collections.Set](https://msdn.microsoft.com/en-au/vstudio/ee340244(v=vs.89))
* [Haskell - Data.Set](http://hackage.haskell.org/package/containers-0.5.10.2/docs/Data-Set.html)
* [Python - set/frozenset](https://docs.python.org/3.6/library/stdtypes.html#set)
* [Hack - HH\Set](https://docs.hhvm.com/hack/reference/class/HH.Set/)
* [Ruby - Set](https://ruby-doc.org/stdlib-2.5.0/libdoc/set/rdoc/Set.html)

### Map (known also as Dictionary)

**TBA**

# Proposal

This proposal does not change grammar of language.

New methods are added to `Set.prototype`.

* Array-like methods. These methods replicates functionality of `Array.prototype` methods:
  * `Set.prototype.filter(predicate, thisArg)`
  * `Set.prototype.map(fn, thisArg)`
  * `Set.prototype.find(fn, thisArg)`
  * `Set.prototype.reduce(fn, initialValue)`
  * `Set.prototype.join(separator)`
  * `Set.prototype.some(predicate, thisArg)`
  * `Set.prototype.every(predicate, thisArg)`
* New methods:
  * `Set.prototype.addAll(...elements)` - similar to `Array.prototype.push`. Adds all of arguments to existing `Set`.
    * Alternative name: `.addEach`
  * `Set.prototype.deleteAll(...elements)` - reverse of `addAll`. Remove every `element` in `elements` from existing `Set`.
    * Alternative names: `.deleteEach`

New methods are added to `Map.prototype`.

* Array-like methods. These methods replicates functionality of `Array.prototype` methods:
  * `Map.prototype.filter(predicate, thisArg)`
  * `Map.prototype.mapValues(fn, thisArg)`
  * `Map.prototype.mapKeys(fn, thisArg)`
  * `Map.prototype.reduce(fn, initialValue)`
  * `Map.prototype.some(predicate, thisArg)`
  * `Map.prototype.every(predicate, thisArg)`
  * `Map.prototype.includes(searchElement)`

* New methods:
  * `Map.prototype.deleteAll(...elements)` - similar to `Set.prototype.deleteAll`.
  * `Map.prototype.merge(iterable)` - performs in-place update joining two maps.
  
New methods are added to `%Map%`.

* `Map.groupBy` - 
* `Map.keyBy` - 

New methods are added to `WeakSet.prototype`.

* New methods:
  * `WeakSet.prototype.addAll(...elements)` - similar to `Set.prototype.addAll`.
  * `WeakSet.prototype.deleteAll(...elements)` - similar to `Set.prototype.deleteAll`.

New methods are added to `WeakMap.prototype`.

* New methods:
  * `WeakMap.prototype.deleteAll(...elements)` - similar to `Map.prototype.deleteAll`.

## Not included in this proposal but worth considering

* `Set.prototype.isSubsetOf(otherSet)`
* `Set.prototype.isSupersetOf(iterable)`
* `Set.prototype.flatMap`, `Set.prototype.flat` - should be added if [`Array.prototype.flatMap`](https://github.com/tc39/proposal-flatMap) is added to language

# Why not `%IteratorPrototype%` methods

* Explicit usage of iterators is verbose
  * Compare `new Set(set.entries().filter(fn))` to `set.filter(fn)`. 19 characters of boilerplate.
    * Even small codebase can have hundreds occurrences of this pattern - and hundreds places to make a mistake.
* User code have no easy way to inherit from `%IteratorPrototype%`

