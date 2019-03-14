export const TEST_TABLE_NAME = 'Test';

export const TEST_SCHEMA = {
    name: TEST_TABLE_NAME,
    primaryKey: 'id',
    properties: {
        id: { type: 'int' },
        base64: { type: 'string' },
        creationDate: { type: 'date' },
        category: { type: 'string' },
        favs: { type: 'int' },
    }
};

