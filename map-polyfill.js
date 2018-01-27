'use strict';

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

    const C = O.constructor;

    if (typeof C === 'undefined') {
        return defaultConstructor;
    }

    if (!isObject(C)) {
        throw new TypeError('O.constructor is not an Object');
    }

    const S = C[Symbol.species];

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

function filter(callbackFn, thisArg) {
    assert(isObject(this), 'this is not an object');
    assert(isCallable(callbackFn), 'callback is not a function');
    const Ctor = SpeciesConstructor(this, Map);
    const retObj = new Ctor();
    const _set = retObj.set;
    for(const [key, value] of this) {
        if (Reflect.apply(callbackFn, thisArg, [value, key, this])) {
            Reflect.apply(_set, retObj, [key, value]);
        }
    }
    return retObj;
}

function mapValues(callbackFn, thisArg) {
    assert(isObject(this), 'this is not an object');
    assert(isCallable(callbackFn), 'callback is not a function');
    const Ctor = SpeciesConstructor(this, Map);
    const retObj = new Ctor();
    const _set = retObj.set;
    for(const [key, value] of this) {
        const newValue = Reflect.apply(callbackFn, thisArg, [value, key, this])
        Reflect.apply(_set, retObj, [key, newValue]);
    }
    return retObj;
}

function mapKeys(callbackFn, thisArg) {
    assert(isObject(this), 'this is not an object');
    assert(isCallable(callbackFn), 'callback is not a function');
    const Ctor = SpeciesConstructor(this, Map);
    const retObj = new Ctor();
    const _set = retObj.set;
    for(const [key, value] of this) {
        const newKey = Reflect.apply(callbackFn, thisArg, [value, key, this])
        Reflect.apply(_set, retObj, [newKey, value]);
    }
    return retObj;
}

function merge(iterable) {
    assert(isObject(this), 'this is not an object');
    const Ctor = SpeciesConstructor(this, Map);
    return new Ctor([...this, ...iterable]);
}

function groupBy(iterable, keyDerivative) {
    assert(isObject(this), 'this is not an object');
    assert(isCallable(this), 'this is not a function');
    assert(Map === this || Map.isPrototypeOf(this), 'this is not a Map constructor');
    const retObj = new this();
    for(const element of iterable) {
        const derivedKey = Reflect.apply(keyDerivative, null, [element]);
        if (!retObj.has(derivedKey)) {
            retObj.set(derivedKey, []);
        }
        const arr = retObj.get(derivedKey);
        arr.push(element);
    }
    return retObj;
}

function keyBy(iterable, keyDerivative) {
    assert(isObject(this), 'this is not an object');
    assert(isCallable(this), 'this is not a function');
    assert(Map === this || Map.isPrototypeOf(this), 'this is not a Map constructor');
    const retObj = new this();
    for(const element of iterable) {
        const derivedKey = Reflect.apply(keyDerivative, null, [element]);
        retObj.set(derivedKey, value);
    }
    return retObj;
}

assert(typeof Map === 'function', 'Map does not exist');
const prototypeMethods = {
    mapValues,
    mapKeys,
    filter,
    merge,

};
const staticMethods = {
    groupBy,
    keyBy
};
for (const [key, value] of Object.entries(prototypeMethods)) {
    Object.defineProperty(Map.prototype, key, {
        configurable: true,
        value
    });
}
for (const [key, value] of Object.entries(staticMethods)) {
    Object.defineProperty(Map, key, {
        configurable: true,
        value
    });
}
