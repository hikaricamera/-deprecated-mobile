export function now() {
    return new Date();
}

export function randomDate() {
    return new Date(
       Math.random() * 1500 + 500,  // [500, 2000]
       Math.random() * 11 + 1,    // [1, 12]
       Math.random() * 364 + 1,     // [1, 365]
       Math.random() * 23,         // [0, 23]
       Math.random() * 59,       // [0, 59]
       Math.random() * 59,       // [0, 59]
    )
}

/***
 * @param dateObj
 * @param format 'yyyy-MM-dd'
 */
export function dateToString(dateObj, format) {
    format = format.toLowerCase();
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const date = dateObj.getUTCDate();

    let day = null;
    if (format === 'yyyy-mm-dd') {
        day = `${year}-${month}-${date}`;
    } else if (format === 'dd/mm/yyyy') {
        day = `${date}/${month}/${year}`;
    } else if (format === 'dd/mm') {
        day = `${date}/${month}`;
    }
    return day;
}
