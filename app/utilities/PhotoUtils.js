import * as RealmUtils from "./RealmUtils";
import {PHOTO_TABLE_NAME, PhotoModel} from "./schema/PhotoSchema";
import {dateToString} from "./DateUtils";

/**
 * Useful utility functions for adding, counting, reading, deleting
 * photos and thumbnails
 *
 * */


export async function addOnePhoto(photoModel) {
    if (photoModel === undefined || photoModel === null) {
        return false;
    }
    if (!(photoModel instanceof PhotoModel)) {
        return false;
    }
    await RealmUtils.insertOne(PHOTO_TABLE_NAME, photoModel.getModel());
    return true;
}

export async function addManyPhotos(photoModels) {
    if (photoModels === undefined || photoModels === null) {
        return false;
    }
    if (!Array.isArray(photoModels)) {
        return false;
    }
    const modelObjs = [];
    for (const photoModel of photoModels) {
       if (!photoModel instanceof PhotoModel) {
           return false;
       }
       modelObjs.push(photoModel.getModel());
    }
    await RealmUtils.insertMany(PHOTO_TABLE_NAME, modelObjs);
    return true;
}

export function loadPhotos(numOfPhotos) {
    return RealmUtils.find(PHOTO_TABLE_NAME, null, null, numOfPhotos);
}

export function loadPhotosSortByCreationDate(numOfPhotos, desc = true) {
    const sortConfig = [['creationDate', desc]];

    return RealmUtils.find(
        PHOTO_TABLE_NAME,
        null,
        sortConfig,
        numOfPhotos
    );
}

/**
 * Useful helper function when a list of photos are
 * already sorted by creation date
 * */
export function groupPhotosByCreationDate(photos) {
    //sanity check photos
    if (photos === null || photos === undefined){
        return null;
    }

    if (!Array.isArray(photos)) {
        return [[photos]];
    }
    if (photos.length <= 1) {
        return [photos];
    }

    let groups = []; // each elem is a list of photos
    let group = [];  // includes photos created on the same day

    photos.forEach(function (photo) {
        if (!group.length) {
            group.push(photo);
        } else {
            const curDateObj = new Date(photo.creationDate);
            const prevDateObj = new Date(group[group.length-1].creationDate);

            const curDay = dateToString(curDateObj, 'yyyy-MM-dd');
            const prevDay = dateToString(prevDateObj, 'yyyy-MM-dd');

            if (curDay === prevDay) {
                group.push(photo);
            } else {
                groups.push(group);
                group = [];
            }
        }
    });
    if (group.length > 0) {
        groups.push(group);
    }

    return groups;
}

