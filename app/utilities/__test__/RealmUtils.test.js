import React from 'react';
import 'react-native';
import * as RealmUtils from '../RealmUtils'
import AsyncStorageMock from "../../../__mock__/AsyncStorageMock";
import {AsyncStorage} from "react-native";
import {TEST_TABLE_NAME} from "../schema/TestSchema";

// mocks
const asyncStorageMock = new AsyncStorageMock();
jest.setMock('AsyncStorage', asyncStorageMock);

function realmObjToPlainObj(realmObj) {
    if (!realmObj) {
        return {};
    }
    let plain = {};
    for (const field in realmObj) {
        plain[field] = realmObj[field];
    }
    return plain;
}

// tests
it('insertOne and findOne', async function () {
    const TEST_TB_NAME = TEST_TABLE_NAME;
    const expected = {
        base64: 'AJEFG37TR8GBDW',
        creationDate: new Date('2019-01-23T00:00:00.000Z'),
        category: 'Cat',
        favs: 10
    };

    // before
    RealmUtils.enableTest();
    RealmUtils.deleteTable(TEST_TB_NAME);
    RealmUtils.initialize();

    // test
    await RealmUtils.insertOne(TEST_TB_NAME, expected);
    const actual = realmObjToPlainObj(RealmUtils.findOne(TEST_TB_NAME));
    expect(actual).toEqual(expected);

    // after
    RealmUtils.destroy();
});

it('insertOne many times and findAll', async function () {
    const TEST_TB_NAME = TEST_TABLE_NAME;
    const instance1 = {
        base64: 'AJEFG37TR8GBDW',
        creationDate: new Date('2019-01-23T00:00:00.000Z'),
        category: 'Cat',
        favs: 10
    };
    const instance2 = {
        base64: 'AFDHSUIFHS',
        creationDate: new Date('2019-02-13T00:00:00.000Z'),
        category: 'Fish',
        favs: 0
    };
    const expected = [instance1, instance2];

    // before
    RealmUtils.enableTest();
    RealmUtils.deleteTable(TEST_TB_NAME);
    RealmUtils.initialize();

    // test
    await RealmUtils.insertMany(TEST_TB_NAME, expected);
    const _actual = RealmUtils.findAll(TEST_TB_NAME);
    const actual = _actual.map((r) => realmObjToPlainObj(r));

    expect(actual).toEqual(expected);

    // after
    RealmUtils.destroy();
});

it('insertMany and findAll with filter', async function () {
    const TEST_TB_NAME = TEST_TABLE_NAME;
    const instance1 = {
        base64: 'AJEFG37TR8GBDW',
        creationDate: new Date('2019-01-23T00:00:00.000Z'),
        category: 'Cat',
        favs: 10
    };
    const instance2 = {
        base64: 'AFDHSUIFHS',
        creationDate: new Date('2019-02-13T00:00:00.000Z'),
        category: 'Fish',
        favs: 0
    };
    const expected = [instance2];

    // before
    RealmUtils.enableTest();
    RealmUtils.deleteTable(TEST_TB_NAME);
    RealmUtils.initialize();

    // test
    await RealmUtils.insertMany(TEST_TB_NAME, [instance1, instance2]);
    const filterQuery = 'base64 = "AFDHSUIFHS"';
    const _actual = RealmUtils.findAll(TEST_TB_NAME, filterQuery);
    const actual = _actual.map((r) => realmObjToPlainObj(r));
    expect(actual).toEqual(expected);

    // after
    RealmUtils.destroy();
});

it('insertMany and findAll in descending order of fav', async function () {
    const TEST_TB_NAME = TEST_TABLE_NAME;
    const instance1 = {
        base64: 'AJEFG37TR8GBDW',
        creationDate: new Date('2019-01-23T00:00:00.000Z'),
        category: 'Cat',
        favs: 10
    };
    const instance2 = {
        base64: 'AFDHSUIFHS',
        creationDate: new Date('2019-02-13T00:00:00.000Z'),
        category: 'Fish',
        favs: 0
    };
    const instance3 = {
        base64: 'FSSRFGWRG',
        creationDate: new Date('2019-02-13T00:00:00.000Z'),
        category: 'Pop',
        favs: 1000
    };
    const expected = [instance3, instance1, instance2];

    // before
    RealmUtils.enableTest();
    RealmUtils.deleteTable(TEST_TB_NAME);
    RealmUtils.initialize();

    // test
    await RealmUtils.insertMany(TEST_TB_NAME,
        [instance1, instance2, instance3]);

    const sortConfig = [
        ['favs', true]
    ];
    const _actual = RealmUtils.findAll(TEST_TB_NAME, null, sortConfig);
    const actual = _actual.map((r) => realmObjToPlainObj(r));
    expect(actual).toEqual(expected);

    // after
    RealmUtils.destroy();
});

it('insertMany and findAll limit by 1', async function () {
    const TEST_TB_NAME = TEST_TABLE_NAME;
    const instance1 = {
        base64: 'AJEFG37TR8GBDW',
        creationDate: new Date('2019-01-23T00:00:00.000Z'),
        category: 'Cat',
        favs: 10
    };
    const instance2 = {
        base64: 'AFDHSUIFHS',
        creationDate: new Date('2019-02-13T00:00:00.000Z'),
        category: 'Fish',
        favs: 0
    };
    const instance3 = {
        base64: 'FSSRFGWRG',
        creationDate: new Date('2019-02-13T00:00:00.000Z'),
        category: 'Pop',
        favs: 1000
    };

    // before
    AsyncStorage.clear();
    RealmUtils.enableTest();
    RealmUtils.deleteTable(TEST_TB_NAME);
    RealmUtils.initialize();

    // test
    await RealmUtils.insertMany(TEST_TB_NAME,
        [instance1, instance2, instance3]);
    const _actual = RealmUtils.find(TEST_TB_NAME, null, null, 1);
    const actual = _actual.map((r) => realmObjToPlainObj(r));
    expect(actual.length).toEqual(1);

    // after
    RealmUtils.destroy();
});

it('insertOne and findByKey mismatched', async function () {
    const TEST_TB_NAME = TEST_TABLE_NAME;
    const instance = {
        base64: 'AJEFG37TR8GBDW',
        creationDate: new Date('2019-01-23T00:00:00.000Z'),
        category: 'Cat',
        favs: 10
    };

    // before
    await AsyncStorage.clear();
    RealmUtils.enableTest();
    RealmUtils.deleteTable(TEST_TB_NAME);
    RealmUtils.initialize();

    // test
    await RealmUtils.insertOne(TEST_TB_NAME, instance);
    const retrievedInstance = RealmUtils.findByKey(TEST_TB_NAME, 0);
    const actual = RealmUtils.findByKey(TEST_TB_NAME,retrievedInstance.id + 1);
    expect(actual).toBe(null);

    // after
    RealmUtils.destroy();
});

it('insertOne and delete by key', async function () {
    const TEST_TB_NAME = TEST_TABLE_NAME;
    const instance = {
        base64: 'AJEFG37TR8GBDW',
        creationDate: new Date('2019-01-23T00:00:00.000Z'),
        category: 'Cat',
        favs: 10
    };

    // before
    await AsyncStorage.clear();
    RealmUtils.enableTest();
    RealmUtils.deleteTable(TEST_TB_NAME);
    RealmUtils.initialize();

    // test
    await RealmUtils.insertOne(TEST_TB_NAME, instance);
    const retrievedInstance = RealmUtils.findByKey(TEST_TB_NAME, 0);
    RealmUtils.deleteByKey(TEST_TB_NAME, retrievedInstance.id);

    const retrievedInstances = RealmUtils.findAll(TEST_TB_NAME);
    expect(retrievedInstances.length).toEqual(0);
});
