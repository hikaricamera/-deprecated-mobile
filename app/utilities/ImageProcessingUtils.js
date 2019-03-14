import ImageResizer from 'react-native-image-resizer';

/**
 * Generate a thumbnail
 * */
export async function thumbnailify(originBase64, maxWidth=100, maxHeight=100, quality=1) {
    const response =
        await ImageResizer.createResizedImage(
            originBase64,   // data uri,
            maxWidth,
            maxHeight,
            'PNG',          // compressed format for android only
            quality,
            0,
            null
        );

    return {
        path: `file:///${response.path}`,
        size: response.size,
    }
}
