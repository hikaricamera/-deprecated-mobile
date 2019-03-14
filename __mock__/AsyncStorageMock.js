export default class AsyncStorageMock {
    constructor(cache = {}) {
        this.storageCache = cache;
    }

    setItem = jest.fn((key, value) => {
        return new Promise((resolve, reject) => {
            return resolve(this.storageCache[key] = value);
        });
    });

    getItem = jest.fn((key) => {
        return new Promise((resolve, ) => {
            if (!(key in this.storageCache)) {
                return resolve(null);
            }
            return resolve(this.storageCache[key]);
        });
    });

    removeItem = jest.fn((key) => {
        return new Promise((resolve, reject) => {resolve()});
    });

    clear = jest.fn((key) => {
        return new Promise((resolve, reject) => {
            resolve(this.storageCache = {})
        });
    });

    getAllKeys = jest.fn((key) => {
        return new Promise((resolve, reject) => {});
    });
}
