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
    if (photos === null || photos === undefined) {
        return null;
    }

    if (!Array.isArray(photos)) {
        return [[photos]];
    }
    if (photos.length <= 1) {
        return [photos];
    }

    // each element in groups has shape
    // {  time
    //    [list of photos]
    // }
    let groups = [];
    let group = [];  // group of photos created on the same day

    let prevDay = null;
    photos.forEach((photo) => {
        const curDateObj = new Date(photo.creationDate);
        const curDay = dateToString(curDateObj, 'yyyy-MM-dd');

        if (group.length === 0) {
            // first photo
            prevDay = curDay;
            group.push(photo);
        } else {
            if (curDay === prevDay) {
                group.push(photo);
            } else {
                groups.push({
                    time: prevDay,
                    photos: group
                });
                group = [photo];
                prevDay = curDay;
            }
        }
    });

    if (group.length > 0) {
        groups.push({
            time: prevDay,
            photos: group
        })
    }

    return groups;
}

