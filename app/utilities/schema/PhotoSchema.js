
export const PHOTO_SCHEMA_REQUIRED_FIELDS = {
    name: {type: 'string'},
    creationDate: {type: 'date'},
    base64: {type: 'string'},
    width: {type: 'int'},
    height: {type: 'int'},
    thumbnailBase64: {type: 'string'}
};

export const PHOTO_SCHEMA_OPTIONAL_FIELDS = {
    id: {type: 'int'},
    exif: {type: 'string?', default: 'unknown'},
    pictureOrietation: {type: 'int?', default: -1},
    deviceOrientation: {type: 'int?', default: -1},
    category: {type: 'string?', default: 'default'},
    favs: {type: 'int?', default: 0},
};

export const PHOTO_TABLE_NAME = 'Photo';

export const PHOTO_SCHEMA = {
    name: PHOTO_TABLE_NAME,
    primaryKey: 'id',
    properties: {
        ...PHOTO_SCHEMA_REQUIRED_FIELDS,
        ...PHOTO_SCHEMA_OPTIONAL_FIELDS,
    }
};

export class PhotoModel {
    constructor(photoData) {
        this.model = {};

        // Goals:
        // 1. Check if all required fields exist
        // 2. TODO: validate type
        // 3. Keep fields ready to be stored

        // validate required fields
        for (const field in PHOTO_SCHEMA_REQUIRED_FIELDS) {
            if (! (field in photoData)) {
                // a required field not exists
                this.model = null;
                return;
            }
            this.model[field] = photoData[field];
        }

        // validate optional fields
        for (const field in PHOTO_SCHEMA_OPTIONAL_FIELDS) {
            if (! (field in photoData)) {
                continue;
            }
            this.model[field] = photoData[field];
        }
    }

    getModel() {
        return this.model;
    }
}
