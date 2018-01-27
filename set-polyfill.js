'use strict';

var originalSet = Set;

function assert(val, msg) {
    if (!val) {
        throw new TypeError(msg);
    }
}

function isObject(x) {
    return (typeof x === 'function' || typeof x === 'object');
}

function SpeciesConstructor(O, defaultConstructor) {
    assert(isObject(O), 'O is not Object');

    var C = O.constructor;

    if (typeof C === 'undefined') {
        return defaultConstructor;
    }

    if (!isObject(C)) {
        throw new TypeError('O.constructor is not an Object');
    }

    var S = C[Symbol.species];

    if (S == null) {
        return defaultConstructor;
    }

    if (typeof S === 'function' && !!S.prototype) {
        return S;
    }

    throw new TypeError('no constructor found');
}

function isCallable(x) {
    try {
        Function.prototype.toString.call(x);
        return true;
    } catch(e) {
        return false;
    }
}

function isSet(obj) {
    const methodNames = ['has', 'add', 'forEach', 'delete', 'keys', 'values', 'entries'];
    return !!(
        obj &&
        methodNames.every(key=>key in obj && typeof obj[key] === 'function') &&
        'size' in obj &&
        typeof obj.size === 'number' &&
        Number.isInteger(obj.size)
    );
}

function filter(predicate, thisArg = null) {
    assert(typeof predicate === 'function');
    assert(isSet(this));
    const ret = new (SpeciesConstructor(this));
    for (const element of this) {
        if (Reflect.apply(predicate, thisArg, [element, element, this])) {
            ret.add(element);
        }
    }
    return ret;
}

function map(mapFunction, thisArg = null) {
    assert(typeof mapFunction === 'function');
    assert(isSet(this));
    const ret = new (SpeciesConstructor(this));
    for (const element of this) {
        ret.add(Reflect.apply(mapFunction, thisArg, [element, element, this]))
    }
    return ret;
}

function some(predicate, thisArg = null) {
    assert(typeof predicate === 'function');
    assert(isSet(this));
    for (const element of this) {
        if (Reflect.apply(predicate, thisArg, [element, element, this])) {
            return true;
        }
    }
    return false;
}

function find(predicate, thisArg = null) {
    assert(typeof predicate === 'function');
    assert(isSet(this));
    for (const element of this) {
        if (Reflect.apply(predicate, thisArg, [element, element, this])) {
            return element;
        }
    }
    return undefined;
}

function every(predicate, thisArg = null) {
    assert(typeof predicate === 'function');
    assert(isSet(this));
    for (const element of this) {
        if (!Reflect.apply(predicate, thisArg, [element, element, this])) {
            return false;
        }
    }
    return true;
}



function addAll(...args) {
    assert(isSet(this));
    for (const element of args) {
        this.add(element);
    }
    return this;
}

function deleteAll(...items) {
    const len = items.length;
    const set = this;
    assert(isObject(set), 'set is not an Object');

    let k = 0;
    const remover = set.delete;
    assert(isCallable(remover), 'remover is not a function');

    while (k < len) {
        const value = items[k];
        Reflect.apply(remover, set, [value]);
        k++;
    }
    return this;
}

assert(typeof Set === 'function', 'Set does not exist');
const prototypeMethods = [
    ['map', map],
    ['filter', filter],
    ['some', some],
    ['every', every],
    ['find', find],
    ['addAll', addAll],
    ['deleteAll', deleteAll],
];
const staticMethods = [
    ['isSet', isSet]
];
for (const [key, value] of prototypeMethods) {
    Object.defineProperty(Set.prototype, key, {
        configurable: true,
        value
    });
}
for (const [key, value] of staticMethods) {
    Object.defineProperty(Set, key, {
        configurable: true,
        value
    });
}
