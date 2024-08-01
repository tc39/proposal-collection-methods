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
  * `Set.prototype.addAll(...elements)` - similar to `Array.prototype.push`. Adds all arguments to existing `Set`.
    * Alternative name: `.addEach`
  * `Set.prototype.deleteAll(...elements)` - reverse of `addAll`. Remove every `element` in `elements` from existing `Set`.
    * Alternative names: `.deleteEach`

New methods are added to `Map.prototype`.

* Array-like methods. These methods replicates functionality of `Array.prototype` methods:
  * `Map.prototype.filter(predicate, thisArg)`
  * `Map.prototype.mapValues(fn, thisArg)`
  * `Map.prototype.mapKeys(fn, thisArg)`
  * `Map.prototype.reduce(fn, initialValue)`
  * `Map.prototype.find(fn, thisArg)`
  * `Map.prototype.findKey(fn, thisArg)`
  * `Map.prototype.keyOf(searchElement)`
  * `Map.prototype.some(predicate, thisArg)`
  * `Map.prototype.every(predicate, thisArg)`
  * `Map.prototype.includes(searchElement)`
  * `Map.prototype.update(key, callbackfn, thunk)`

* New methods:
  * `Map.prototype.deleteAll(...elements)` - similar to `Set.prototype.deleteAll`.
  * `Map.prototype.merge(...iterables)` - performs in-place update joining arbitrary number of iterables.
  * `Map.prototype.update(key, cb [,thunk])` - performs in-place update of single value. 
  
New method is added to `%Map%`:

* `Map.keyBy(iterable, keyDerivative)` - 

New methods are added to `WeakSet.prototype`.

* New methods:
  * `WeakSet.prototype.addAll(...elements)` - similar to `Set.prototype.addAll`.
  * `WeakSet.prototype.deleteAll(...elements)` - similar to `Set.prototype.deleteAll`.

New method is added to `WeakMap.prototype`:

* `WeakMap.prototype.deleteAll(...elements)` - similar to `Map.prototype.deleteAll`.

## Polyfill

A polyfill is available in the [core-js](https://github.com/zloirock/core-js) library.
You can find it in the [ECMAScript proposal section](https://github.com/zloirock/core-js#ecmascript-proposals) 
/ **Stage 1 proposals** / **New Set and Map methods proposal**.

For all new collection methods include this at the top of your entry point.
```js
require('core-js/proposals/collection-methods');

const colors = new Map([['red', '#FF0000'], ['gold', '#FFD700']]);
colors
  .mapKeys((value, key) => key.toUpperCase()) // Map { 'RED' => '#FF0000', 'GOLD' => '#FFD700' }
  .mapValues(value => value.toLowerCase()); // Map { 'RED' => '#ff0000', 'GOLD' => '#ffd700' }
```
For a specific method include the needed polyfill directly.
```js
require('core-js/features/set/join');

const mySet = new Set(['Just', 'like', 'an', 'array']);
mySet.join(' '); // Just like an array
```

## Not included in this proposal but worth considering

* `Set.prototype.flatMap`, `Set.prototype.flat` - should be added if [`Array.prototype.flatMap`](https://github.com/tc39/proposal-flatMap) is added to language

# Why not `%IteratorPrototype%` methods

See [stage 3 Iterator Helpers](https://github.com/tc39/proposal-iterator-helpers) proposal.

# Rationales

See [rationales.md](./rationales.md) for details.
