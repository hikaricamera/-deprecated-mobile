import {PHOTO_SCHEMA, PhotoModel} from "../schema/PhotoSchema";

it('Validate Photo Schema', function () {
    const input = PHOTO_SCHEMA;
    const expected = {
        id: {type: 'int'},
        name: {type: 'string'},
        creationDate: {type: 'date'},
        base64: {type: 'string'},
        thumbnailBase64: {type: 'string'},
        width: {type: 'int'},
        height: {type: 'int'},
        exif: {type: 'string?', default: 'unknown'},
        pictureOrietation: {type: 'int?', default: -1},
        deviceOrientation: {type: 'int?', default: -1},
        category: {type: 'string?', default: 'default'},
        favs: {type: 'int?', default: 0},
    };
    const actual = input.properties;
    expect(actual).toEqual(expected);
});

it('Add required fields', function () {
   const input = {
        id: 1,
        name: 'test',
        creationDate: '2019-12-21',
        base64: '',
        thumbnailBase64: '',
        width: 100,
        height: 100
   };
   const expected = Object.assign({}, input);
   const actual = new PhotoModel(input).getModel();
   expect(actual).toEqual(expected);
});

it('Add optional fields', function () {
    const input = {
        id: 1,
        name: 'test',
        creationDate: '2019-12-21',
        base64: '',
        thumbnailBase64: '',
        width: 100,
        height: 100,
        exif: '',
        category: '',
        favs: 10,
   };
   const expected = Object.assign({}, input);
   const actual = new PhotoModel(input).getModel();
   expect(actual).toEqual(expected);
});

it('Add extra unnecessary fields', function () {
    const input = {
        id: 1,
        name: 'test',
        creationDate: '2019-12-21',
        base64: '',
        thumbnailBase64: '',
        width: 100,
        height: 100,
        exif: '',
        category: '',
        favs: 10,
        extra: 'not accepted'
   };
   const expected = {
        id: 1,
        name: 'test',
        creationDate: '2019-12-21',
        base64: '',
        thumbnailBase64: '',
        width: 100,
        height: 100,
        exif: '',
        category: '',
        favs: 10,
   };
   const actual = new PhotoModel(input).getModel();
   expect(actual).toEqual(expected);
});

it('Miss required fields', function () {
    const input = {
        id: 1,
        name: 'test',
        creationDate: '2019-12-21',
        base64: '',
    };
    const expected = null;
    const actual = new PhotoModel(input).getModel();
    expect(actual).toEqual(expected);
});
