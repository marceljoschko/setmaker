const CAMELOT_MINOR = [
    "5A",
    "12A",
    "7A",
    "2A",
    "9A",
    "4A",
    "11A",
    "6A",
    "1A",
    "8A",
    "3A",
    "10A",
];
const CAMELOT_MAJOR = [
    "8B",
    "3B",
    "10B",
    "5B",
    "12B",
    "7B",
    "2B",
    "9B",
    "4B",
    "11B",
    "6B",
    "1B",
];

const FLAT_MINOR = [
    "Cm",
    "Dbm",
    "Dm",
    "Ebm",
    "Em",
    "Fm",
    "Fbm",
    "Gm",
    "Abm",
    "Am",
    "Bbm",
    "Bm",
];
const FLAT_MAJOR = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Fb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
];

export const ALL_FLAT_KEYS = [
    "Cm",
    "Dbm",
    "Dm",
    "Ebm",
    "Em",
    "Fm",
    "Fbm",
    "Gm",
    "Abm",
    "Am",
    "Bbm",
    "Bm",
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Fb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
];

export const findCamelotKey = (key, mode) => {
    return mode ? CAMELOT_MAJOR[key] : CAMELOT_MINOR[key];
};

export const findFlatKey = (key, mode) => {
    return mode ? FLAT_MAJOR[key] : FLAT_MINOR[key];
};

export const getCurrentDate = () => {
    let today = new Date();

    return (
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds()
    );
};
