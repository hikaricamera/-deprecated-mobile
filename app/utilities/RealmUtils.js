import Realm from 'realm';
import {AsyncStorage} from "react-native";
import {PHOTO_SCHEMA} from "./schema/PhotoSchema";
import {TEST_SCHEMA} from "./schema/TestSchema";

/**
 * Helper Functions
 * */

function assertNotNullOrUndefined(paramName) {
    if (paramName === null || paramName === undefined) {
        throw new Error(`Parameter ${paramName} is null`);
    }
}

async function generateId(tableName) {
    assertNotNullOrUndefined(tableName);

    const key = `realm_${tableName}_id`;
    let prevId = await AsyncStorage.getItem(key);
    if (prevId === null) {
        prevId = -1;
    }
    const nextId = parseInt(prevId) + 1;
    await AsyncStorage.setItem(key, nextId.toString());
    return nextId;
}



/**
 * Realm CRUD Operations
 * */
let realm = null;
let testEnabled = false;

export function enableTest() {
    testEnabled = true;
}

export function disableTest() {
    testEnabled = false;
}

export function initialize() {
    // synchronously open the database
    // create the datbase if not exist
    let registeredSchemas = [
        PHOTO_SCHEMA,
    ];
    if (testEnabled) {
        deleteTable(PHOTO_SCHEMA);
        registeredSchemas.push(TEST_SCHEMA);
    }
    realm = new Realm({
        schema: registeredSchemas,
        schemaVersion: 1,
    });
}

export function destroy() {
    if (realm) {
        realm.close();
        realm = null;
        disableTest();
    }
}

export async function insertOne(tableName, val) {
    assertNotNullOrUndefined(tableName);

    if (!val.id) {
        // if id doesn't exist, auto generate one
        val.id = await generateId(tableName.toLowerCase());
    }
    realm.write(() => {
        realm.create(tableName, val);
    });
}

export async function insertMany(tableName, vals) {
    assertNotNullOrUndefined(tableName);

    if (!vals) {
        return;
    }

    for (let val of vals) {
        if (!val.id) {
            val.id = await generateId(tableName.toLowerCase());
        }
    }

    realm.write(() => {
        for (const val of vals) {
            realm.create(tableName, val);
        }
    });
}

/**
 * Find the record in table by primary key. If the record
 * does not exist in the table, then return null
 * */
export function findByKey(tableName, key) {
    assertNotNullOrUndefined(tableName);
    assertNotNullOrUndefined(key);

    const result = realm.objectForPrimaryKey(tableName, key);
    return result ? result : null;
}

export function find(tableName, filterQuery, sortConfig, limit) {
    assertNotNullOrUndefined(tableName);

    let results = realm.objects(tableName);
    if (filterQuery) {
        results = results.filtered(filterQuery);
    }
    if (sortConfig) {
        results = results.sorted(sortConfig);
    }
    if (limit) {
        results = results.slice(0, limit);
    }
    return results;
}

export function findOne(tableName, filterQuery, sortConfig) {
    assertNotNullOrUndefined(tableName);

    const results = find(tableName, filterQuery, sortConfig, 1);
    if (!results) {
        return null;
    }
    return results[0];
}

export function findAll(tableName, filterQuery, sortConfig) {
    assertNotNullOrUndefined(tableName);

    // limit is undefined, thus return all results
    return find(tableName, filterQuery, sortConfig);
}

/**
 * deleteTable function could be called before initialization
 * */
export function deleteTable(tableName) {
    assertNotNullOrUndefined(tableName);

    Realm.deleteFile({name: tableName});
}

export function deleteByKey(tableName, key) {
    assertNotNullOrUndefined(tableName);
    assertNotNullOrUndefined(key);

    realm.write(() => {
        realm.delete(realm.objectForPrimaryKey(tableName, key));
    });
}
