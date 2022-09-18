﻿const cyclicOffset = (reference, offset, limits) => {
    if (offset && reference >= limits[0] && reference <= limits[1]) {
        reference += offset;
        if (reference < limits[0]) {
            reference += limits[1];
        }
        if (reference > limits[1]) {
            reference -= limits[1];
        }
    }
    return reference;
};

export const camelotWheel = {
    // Use methods at bottom to get a copy of the objects and not just a reference to the originals
    wheelNotationFlat: new Map([
        [1, { A: "Abm", B: "B", m: "Am", d: "C" }], // Camelot Key
        [2, { A: "Ebm", B: "Gb", m: "Em", d: "G" }],
        [3, { A: "Bbm", B: "Db", m: "Bm", d: "D" }],
        [4, { A: "Fm", B: "Ab", m: "Gbm", d: "A" }],
        [5, { A: "Cm", B: "Eb", m: "Dbm", d: "E" }],
        [6, { A: "Gm", B: "Bb", m: "Abm", d: "B" }],
        [7, { A: "Dm", B: "F", m: "Ebm", d: "Gb" }],
        [8, { A: "Am", B: "C", m: "Bbm", d: "Db" }],
        [9, { A: "Em", B: "G", m: "Fm", d: "Ab" }],
        [10, { A: "Bm", B: "D", m: "Cm", d: "Eb" }],
        [11, { A: "Gbm", B: "A", m: "Gm", d: "Bb" }],
        [12, { A: "Dbm", B: "E", m: "Dm", d: "F" }],
    ]),
    wheelNotationSharp: new Map([
        [1, { A: "G#m", B: "B", m: "Am", d: "C" }],
        [2, { A: "D#m", B: "F#", m: "Em", d: "G" }],
        [3, { A: "A#m", B: "C#", m: "Bm", d: "D" }],
        [4, { A: "Fm", B: "G#", m: "F#m", d: "A" }],
        [5, { A: "Cm", B: "D#", m: "C#m", d: "E" }],
        [6, { A: "Gm", B: "A#", m: "G#m", d: "B" }],
        [7, { A: "Dm", B: "F", m: "D#m", d: "F#" }],
        [8, { A: "Am", B: "C", m: "A#m", d: "C#" }],
        [9, { A: "Em", B: "G", m: "Fm", d: "G#" }],
        [10, { A: "Bm", B: "D", m: "Cm", d: "D#" }],
        [11, { A: "F#m", B: "A", m: "Gm", d: "A#" }],
        [12, { A: "C#m", B: "E", m: "Dm", d: "F" }],
    ]),
    wheelNotationOpen: new Map([
        [1, { A: "6m", B: "6d", m: "1m", d: "1d" }],
        [2, { A: "7m", B: "7d", m: "2m", d: "2d" }],
        [3, { A: "8m", B: "8d", m: "3m", d: "3d" }],
        [4, { A: "9m", B: "9d", m: "4m", d: "4d" }],
        [5, { A: "10m", B: "10d", m: "5m", d: "5d" }],
        [6, { A: "11m", B: "11d", m: "6m", d: "6d" }],
        [7, { A: "12m", B: "12d", m: "7m", d: "7d" }],
        [8, { A: "1m", B: "1d", m: "8m", d: "8d" }],
        [9, { A: "2m", B: "2d", m: "9m", d: "9d" }],
        [10, { A: "3m", B: "3d", m: "10m", d: "10d" }],
        [11, { A: "4m", B: "4d", m: "11m", d: "11d" }],
        [12, { A: "5m", B: "5d", m: "12m", d: "12d" }],
    ]),
    wheelNotationCamelot: new Map([
        [1, { A: "1A", B: "1B", m: "8A", d: "8B" }],
        [2, { A: "2A", B: "2B", m: "9A", d: "9B" }],
        [3, { A: "3A", B: "3B", m: "10A", d: "10B" }],
        [4, { A: "4A", B: "4B", m: "11A", d: "11B" }],
        [5, { A: "5A", B: "5B", m: "12A", d: "12B" }],
        [6, { A: "6A", B: "6B", m: "1A", d: "1B" }],
        [7, { A: "7A", B: "7B", m: "2A", d: "2B" }],
        [8, { A: "8A", B: "8B", m: "3A", d: "3B" }],
        [9, { A: "9A", B: "9B", m: "4A", d: "4B" }],
        [10, { A: "10A", B: "10B", m: "5A", d: "5B" }],
        [11, { A: "11A", B: "11B", m: "6A", d: "6B" }],
        [12, { A: "12A", B: "12B", m: "7A", d: "7B" }],
    ]),
    keyNotationObject: new Map([
        //Merged sharp and flat key notations when there are equivalences
        ["G#m", { hour: 1, letter: "A" }], // Minor
        ["Abm", { hour: 1, letter: "A" }],
        ["D#m", { hour: 2, letter: "A" }],
        ["Ebm", { hour: 2, letter: "A" }],
        ["A#m", { hour: 3, letter: "A" }],
        ["Bbm", { hour: 3, letter: "A" }],
        ["Fm", { hour: 4, letter: "A" }],
        ["Cm", { hour: 5, letter: "A" }],
        ["Gm", { hour: 6, letter: "A" }],
        ["Dm", { hour: 7, letter: "A" }],
        ["Am", { hour: 8, letter: "A" }],
        ["Em", { hour: 9, letter: "A" }],
        ["Bm", { hour: 10, letter: "A" }],
        ["F#m", { hour: 11, letter: "A" }],
        ["Gbm", { hour: 11, letter: "A" }],
        ["C#m", { hour: 12, letter: "A" }],
        ["Dbm", { hour: 12, letter: "A" }],
        ["B", { hour: 1, letter: "B" }], // Major
        ["F#", { hour: 2, letter: "B" }],
        ["Gb", { hour: 2, letter: "B" }],
        ["C#", { hour: 3, letter: "B" }],
        ["Db", { hour: 3, letter: "B" }],
        ["G#", { hour: 4, letter: "B" }],
        ["Ab", { hour: 4, letter: "B" }],
        ["D#", { hour: 5, letter: "B" }],
        ["Eb", { hour: 5, letter: "B" }],
        ["A#", { hour: 6, letter: "B" }],
        ["Bb", { hour: 6, letter: "B" }],
        ["F", { hour: 7, letter: "B" }],
        ["C", { hour: 8, letter: "B" }],
        ["G", { hour: 9, letter: "B" }],
        ["D", { hour: 10, letter: "B" }],
        ["A", { hour: 11, letter: "B" }],
        ["E", { hour: 12, letter: "B" }],
        ["1A", { hour: 1, letter: "A" }], // Itself
        ["2A", { hour: 2, letter: "A" }],
        ["3A", { hour: 3, letter: "A" }],
        ["4A", { hour: 4, letter: "A" }],
        ["5A", { hour: 5, letter: "A" }],
        ["6A", { hour: 6, letter: "A" }],
        ["7A", { hour: 7, letter: "A" }],
        ["8A", { hour: 8, letter: "A" }],
        ["9A", { hour: 9, letter: "A" }],
        ["10A", { hour: 10, letter: "A" }],
        ["11A", { hour: 11, letter: "A" }],
        ["12A", { hour: 12, letter: "A" }],
        ["1B", { hour: 1, letter: "B" }],
        ["2B", { hour: 2, letter: "B" }],
        ["3B", { hour: 3, letter: "B" }],
        ["4B", { hour: 4, letter: "B" }],
        ["5B", { hour: 5, letter: "B" }],
        ["6B", { hour: 6, letter: "B" }],
        ["7B", { hour: 7, letter: "B" }],
        ["8B", { hour: 8, letter: "B" }],
        ["9B", { hour: 9, letter: "B" }],
        ["10B", { hour: 10, letter: "B" }],
        ["11B", { hour: 11, letter: "B" }],
        ["12B", { hour: 12, letter: "B" }],
        ["6m", { hour: 1, letter: "A" }], // Open Key
        ["7m", { hour: 2, letter: "A" }],
        ["8m", { hour: 3, letter: "A" }],
        ["9m", { hour: 4, letter: "A" }],
        ["10m", { hour: 5, letter: "A" }],
        ["11m", { hour: 6, letter: "A" }],
        ["12m", { hour: 7, letter: "A" }],
        ["1m", { hour: 8, letter: "A" }],
        ["2m", { hour: 9, letter: "A" }],
        ["3m", { hour: 10, letter: "A" }],
        ["4m", { hour: 11, letter: "A" }],
        ["5m", { hour: 12, letter: "A" }],
        ["6d", { hour: 1, letter: "B" }],
        ["7d", { hour: 2, letter: "B" }],
        ["8d", { hour: 3, letter: "B" }],
        ["9d", { hour: 4, letter: "B" }],
        ["10d", { hour: 5, letter: "B" }],
        ["11d", { hour: 6, letter: "B" }],
        ["12d", { hour: 7, letter: "B" }],
        ["1d", { hour: 8, letter: "B" }],
        ["2d", { hour: 9, letter: "B" }],
        ["3d", { hour: 10, letter: "B" }],
        ["4d", { hour: 11, letter: "B" }],
        ["5d", { hour: 12, letter: "B" }],
    ]),
    keyNotation: new Map([
        //Merged sharp and flat key notations when there are equivalences
        ["G#m", "1A"], // Minor
        ["Abm", "1A"],
        ["D#m", "2A"],
        ["Ebm", "2A"],
        ["A#m", "3A"],
        ["Bbm", "3A"],
        ["Fm", "4A"],
        ["Cm", "5A"],
        ["Gm", "6A"],
        ["Dm", "7A"],
        ["Am", "8A"],
        ["Em", "9A"],
        ["Bm", "10A"],
        ["F#m", "11A"],
        ["Gbm", "11A"],
        ["C#m", "12A"],
        ["Dbm", "12A"],
        ["B", "1B"], // Major
        ["F#", "2B"],
        ["Gb", "2B"],
        ["C#", "3B"],
        ["Db", "3B"],
        ["G#", "4B"],
        ["Ab", "4B"],
        ["D#", "5B"],
        ["Eb", "5B"],
        ["A#", "6B"],
        ["Bb", "6B"],
        ["F", "7B"],
        ["C", "8B"],
        ["G", "9B"],
        ["D", "10B"],
        ["A", "11B"],
        ["E", "12B"],
        ["1A", "1A"], // Itself
        ["2A", "2A"],
        ["3A", "3A"],
        ["4A", "4A"],
        ["5A", "5A"],
        ["6A", "6A"],
        ["7A", "7A"],
        ["8A", "8A"],
        ["9A", "9A"],
        ["10A", "10A"],
        ["11A", "11A"],
        ["12A", "12A"],
        ["1B", "1B"],
        ["2B", "2B"],
        ["3B", "3B"],
        ["4B", "4B"],
        ["5B", "5B"],
        ["6B", "6B"],
        ["7B", "7B"],
        ["8B", "8B"],
        ["9B", "9B"],
        ["10B", "10B"],
        ["11B", "11B"],
        ["12B", "12B"],
        ["6m", "1A"], // Open Key
        ["7m", "2A"],
        ["8m", "3A"],
        ["9m", "4A"],
        ["10m", "5A"],
        ["11m", "6A"],
        ["12m", "7A"],
        ["1m", "8A"],
        ["2m", "9A"],
        ["3m", "10A"],
        ["4m", "11A"],
        ["5m", "12A"],
        ["6d", "1B"],
        ["7d", "2B"],
        ["8d", "3B"],
        ["9d", "4B"],
        ["10d", "5B"],
        ["11d", "6B"],
        ["12d", "7B"],
        ["1d", "8B"],
        ["2d", "9B"],
        ["3d", "10B"],
        ["4d", "11B"],
        ["5d", "12B"],
    ]),
    // Methods to retrieve Key Objects (x) from Key Strings (y)
    // x: Camelot Key or Open Key -> {hour, letter}
    // y: Standard Notation Key (flat and sharp), Camelot Key or Open Key -> string
    hasKey(xy) {
        return typeof xy === "object"
            ? xy.hasOwnProperty("hour") && xy.hasOwnProperty("letter")
                ? this.keyNotation.has(xy.hour + xy.letter)
                : false
            : this.keyNotation.has(xy);
    },
    getKeyNotationObjectCamelot(y) {
        return this.hasKey(y) ? { ...this.keyNotationObject.get(y) } : null;
    }, // Retrieves camelot object
    getKeyNotationObjectOpen(y) {
        const x = this.getKeyNotationObjectCamelot(y);
        if (x) {
            this.translateObjectCamelotToOpen(x);
        }
        return x;
    }, // Retrieves open key object
    translateObjectCamelotToOpen(x) {
        if (x.hour >= 8) {
            x.hour -= 7;
        } else {
            x.hour += 5;
        }
        x.letter = x.letter === "A" ? "m" : "d";
        return x;
    }, // {Camelot} -> {Open Key}
    translateObjectOpenToCamelot(x) {
        if (x.hour <= 5) {
            x.hour += 7;
        } else {
            x.hour -= 5;
        }
        x.letter = x.letter === "m" ? "A" : "B";
        return x;
    }, // {Open Key} -> {Camelot}
    // Methods to retrieve Key Strings (y) from Key Objects (x)
    getKeyNotationFlat(x) {
        return this.hasKey(x)
            ? this.wheelNotationFlat.get(x.hour)[x.letter]
            : null;
    },
    getKeyNotationSharp(x) {
        return this.hasKey(x)
            ? this.wheelNotationSharp.get(x.hour)[x.letter]
            : null;
    },
    getKeyNotationOpen(x) {
        return this.hasKey(x)
            ? this.wheelNotationOpen.get(x.hour)[x.letter]
            : null;
    },
    getKeyNotationCamelot(x) {
        return this.hasKey(x)
            ? this.wheelNotationCamelot.get(x.hour)[x.letter]
            : null;
    },
    // Methods to work with Key Objects (x)
    // Beware to pass a copy of the object if you want a new key object, otherwise the original will be modified!
    // Works for camelot or open key objects, no need to translate
    perfectMatch(x) {
        return x;
    },
    energyBoost(x) {
        x.hour = cyclicOffset(x.hour, 1, [1, 12]);
        return x;
    },
    energyDrop(x) {
        x.hour = cyclicOffset(x.hour, -1, [1, 12]);
        return x;
    },
    energySwitch(x) {
        x.letter =
            x.letter === "A" || x.letter === "B"
                ? x.letter === "A"
                    ? "B"
                    : "A"
                : x.letter === "m"
                ? "d"
                : "m";
        return x;
    },
    moodBoost(x) {
        x.hour = cyclicOffset(x.hour, 3, [1, 12]);
        return x;
    },
    moodDrop(x) {
        x.hour = cyclicOffset(x.hour, -3, [1, 12]);
        return x;
    },
    domKey(x) {
        this.energySwitch(x);
        this.energyBoost(x);
        return x;
    },
    subDomKey(x) {
        this.energySwitch(x);
        this.energyDrop(x);
        return x;
    },
    energyRaise(x) {
        x.hour = cyclicOffset(x.hour, 7, [1, 12]);
        return x;
    },
};