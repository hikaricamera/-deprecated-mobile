import randomString from 'random-string'

export function optionalFunc(func) {
    if (func === undefined || func === null) {
        return () => {};
    }
    return func;
}

export function optionalPrimitive(type, param, defaultVal) {
    if (param !== undefined) {
        return param;
    }
    if (defaultVal !== undefined) {
        return defaultVal;
    }

    // param is undefined and defaultVal is undefined
    if (typeof type !== 'string') {
        return null;
    }
    type = type.toLowerCase();

    switch (type) {
        case 'int':
            return 0;
        case 'string':
            return '';
        case 'float':
            return 0.0;
        case 'bool':
        case 'boolean':
            return false;
        case 'object':
            return {};
        case 'array':
        case 'list':
            return [];
        default:
            return null;
    }
}

export function chooseNonNullInOrder(values, noNonNull = null) {
    for (let val of values) {
        if (val !== undefined) {
            return val;
        }
    }
    return noNonNull;
}

/**
 * Add a 'key' field for the element.
 * This will mutate the element.
 * */
export function addDefaultKey(elem, val = null) {
    if ('key' in elem) {
        return elem;
    }
    if (val === null) {
        elem.key = randomString({length: 20});
    } else {
        elem.key = val;
    }
    return elem;
}

/**
 * Add a 'key' field for each element in the array.
 * This will mutate the array.
 * */
export function addDefaultKeyToArray(arr) {
    if (!Array.isArray(arr)) {
        return null;
    }
    for (let i = 0;i < arr.length;i ++) {
        addDefaultKey(arr[i], `item-${i}`);
    }
    return arr;
}

/**
 * Return a shallow copy of updated object.
 * If the field name does not exist, then create a new field
 * */
export function updateField(obj, fieldName, newVal): Object {
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (!(obj instanceof Object)) {
        return undefined;
    }

    const set = function (o, fields) {
        if (fields.length === 1) {
            return {
                ...o,
                [fields[0]]: newVal,
            };
        }
        return {
            ...o,
            [fields[0]]: set(o[fields[0]], fields.slice(1))
        }
    };

    const fields = fieldName.split('.');
    return set(obj, fields);
}
