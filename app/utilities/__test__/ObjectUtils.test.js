import React from 'react';
import 'react-native';
import {addDefaultKey, addDefaultKeyToArray, chooseNonNullInOrder, optionalFunc, updateField} from "../ObjectUtils";

/**
 * Note:
 *  1. When comparing two function definitions, need to
 *     eliminate the name difference and use toString()
 *
 * */

/**
 * When a anonymous function is assigned to the variable,
 * it may be associated with the name of variable,
 * This helper function prevents it.
 * */
function keepAnonymous(lambdaFunc) {
    return lambdaFunc;
}

it('optionalFunc with undefined parameter', function () {
    const actual = optionalFunc(undefined);
    const expected = keepAnonymous(() => {});
    expect(actual.toString()).toEqual(expected.toString());
});

it('optionalFunc with null parameter', function () {
    const actual = optionalFunc(null);
    const expected = keepAnonymous(() => {});
    expect(actual.toString()).toEqual(expected.toString());
});

it('optionalFunc with non-null parameter', function () {
    const input = keepAnonymous(() => 'test');
    const actual = optionalFunc(input);
    const expected = keepAnonymous(() => 'test');

    expect(actual.toString()).toEqual(expected.toString());
});

it('chooseNonNullInOrder with non-null', function () {
   const input = [undefined, undefined, null, '', undefined];
   const expected = null;
   const actual = chooseNonNullInOrder(input);
   expect(actual).toEqual(expected);
});

it('chooseNonNullInOrder with all non-null', function () {
   const input = [undefined, undefined, undefined, undefined, undefined];
   const expected = 'all';
   const actual = chooseNonNullInOrder(input, 'all');
   expect(actual).toEqual(expected);
});

it('addDefaultKey with "key" field', function () {
    const input = {
        'key': 1,
        'val': 'test'
    };
    const actual = addDefaultKey(Object.assign({}, input));
    const expected = Object.assign({}, input);
    expect(actual).toEqual(expected);
});

it('addDefaultKey without "key" field', function () {
    const input = {
        'val': 'test'
    };

    const actual = addDefaultKey(input);
    const expected = {
        'key': 'default',
        'val': 'test'
    };
    expect(actual).toEqual(expected);
});

it('addDefaultKey without "key" field with specified val', function () {
    const input = {
        'val': 'test'
    };
    const actual = addDefaultKey(input, 'specified');
    const expected = {
        'key': 'specified',
        'val': 'test'
    };
    expect(actual).toEqual(expected);
});

it('addDefaultKeyToArray', function () {
    const input = [
        {
            'key': 'my-1',
            'val': 1
        },
        {
            'val': 2,
        },
        {
            'val': 3,
        }
    ];
    const actual = addDefaultKeyToArray(input);
    const expected = [
        {
            'key': 'my-1',
            'val': 1
        },
        {
            'key': 'item-1',
            'val': 2,
        },
        {
            'key': 'item-2',
            'val': 3
        }
    ];
    expect(actual).toEqual(expected);
});

it('updateField shallow', function () {
    const input = {
        'name': 'John Doe',
        'age': 12,
        'fav': 'cooking'
    };
    const actual = updateField(input, 'name', 'Yin Guo');
    const expected = {
        'name': 'Yin Guo',
        'age': 12,
        'fav': 'cooking'
    };
    expect(actual).toEqual(expected);
});

it('updateField recursively', function () {
    const input = {
        'name': 'John Doe',
        'age': 12,
        'address': {
            'street': {
                'unit': 'xxx',
                'PO_box': '54312'
            },
            'city': 'San Francisco',
            'state': 'California',
            'country': 'United States',
            'country_code': 'US',
        },
        'skills': [
            'Java',
            'C++/C',
            'Python',
            'Javscript'
        ]
    };
    const actual = updateField(input, 'address.street.PO_box', '12345');
    const expected = {
        'name': 'John Doe',
        'age': 12,
        'address': {
            'street': {
                'unit': 'xxx',
                'PO_box': '12345'
            },
            'city': 'San Francisco',
            'state': 'California',
            'country': 'United States',
            'country_code': 'US',
        },
        'skills': [
            'Java',
            'C++/C',
            'Python',
            'Javscript'
        ]
    };
    expect(actual).toEqual(expected);
});

it('updateField fieldName mismatched', function () {
    const input = {
        'name': 'John Doe',
        'level2': {
            'key': 'X1738'
        }
    };
    const expected = {
        'name': 'John Doe',
        'level2': {
            'key': 'X1738'
        },
        'level3': {
            'key2': 'X878'
        }
    };
    const actual = updateField(input, 'level3.key2', 'X878');
    expect(actual).toEqual(expected);
});
