# Set prototype methods

## Set.prototype.filter

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.filter](https://tc39.github.io/ecma262/#sec-array.prototype.filter) as close as reasonable.

## Set.prototype.map

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.map](https://tc39.github.io/ecma262/#sec-array.prototype.map) as close as reasonable.


## Set.prototype.find

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.find](https://tc39.github.io/ecma262/#sec-array.prototype.find) as close as reasonable.
* [Problematic behaviour](https://github.com/tc39/proposal-collection-methods/issues/6)

## Set.prototype.reduce

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.reduce](https://tc39.github.io/ecma262/#sec-array.prototype.reduce) as close as reasonable.
* Static linters can check if function used by Set.prototype.reduce is [associative](https://en.wikipedia.org/wiki/Associative_property) and [commutative](https://en.wikipedia.org/wiki/Commutative_property). Otherwise, results can be surprising to user.

## Set.prototype.join

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.join](https://tc39.github.io/ecma262/#sec-array.prototype.join) as close as reasonable.

## Set.prototype.some

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.some](https://tc39.github.io/ecma262/#sec-array.prototype.some) as close as reasonable.


## Set.prototype.every

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.every](https://tc39.github.io/ecma262/#sec-array.prototype.every) as close as reasonable.


## Set.prototype.addAll

* `Set.prototype.add` can't be extended due to pattern of `arr.forEach(set.add, set)` and `arr.forEach(set.add.bind(set))`.
* Doesn't create new set like [`Set.prototype.union`](https://tc39.github.io/proposal-set-methods/#Set.prototype.union)


## Set.prototype.deleteAll

* `Set.prototype.delete` can't be extended due to pattern of `arr.forEach(set.delete, set)` and `arr.forEach(set.delete.bind(set))`.



# Map prototype methods

## Map.prototype.filter

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.filter](https://tc39.github.io/ecma262/#sec-array.prototype.filter) as close as reasonable.


## Map.prototype.mapValues

TBA


## Map.prototype.mapKeys

TBA


## Map.prototype.reduce

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.reduce](https://tc39.github.io/ecma262/#sec-array.prototype.reduce) as close as reasonable.


## Map.prototype.find

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.find](https://tc39.github.io/ecma262/#sec-array.prototype.find).
* This methods find value and returns it. It can be reasonable to return pair `[key, value]` or merge it with `findKey`.

## Map.prototype.findKey
* This methods find value and returns its key. It can be reasonable to return pair `[key, value]` or merge it with `find`.

## Map.prototype.keyOf(searchElement)

* This methods returns first key where `SameValueZero(p.[[Value]], searchElement)` is *true*.

## Map.prototype.some

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.some](https://tc39.github.io/ecma262/#sec-array.prototype.some) as close as reasonable.


## Map.prototype.every

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.some](https://tc39.github.io/ecma262/#sec-array.prototype.some) as close as reasonable.

## Map.prototype.includes

* Added to make all collections similar in capabilities. Should mimic [Array.prototype.includes](https://tc39.github.io/ecma262/#sec-array.prototype.includes) as close as reasonable.


## Map.prototype.update

TBA


## Map.prototype.deleteAll

TBA


## Map.prototype.merge

TBA


# Map static methods

## Map.groupBy

TBA

## Map.keyBy

TBA
