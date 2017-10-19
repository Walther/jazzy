const tonal = require('tonal');
const fp = require('lodash/fp');

const getScale = () => {
    let root = _.sample(tonal.Note.names());
    let scaleType = 'major';
    let scale = root + ' ' + scaleType;
    return scale;
};

const getChords = scale => {
    let progression = [
        {
            degree: 2,
            type: 'm7'
        },
        {
            degree: 5,
            type: '7'
        },
        {
            degree: 1,
            type: 'maj7'
        }
    ];
    let notes = tonal.Scale.notes(scale);
    let chords = progression.map(
        ({ degree, type }) => notes[degree - 1] + type
    );
    return chords;
};

const writeSheet = data => {
    let prettyPrint = 'Scale: ' + data.scale;
    prettyPrint += '<br> Chords: ' + data.chords.join(', ');

    document.getElementById('jazz').innerHTML = prettyPrint;
};

/* --- --- --- */

console.log('Hello, Jazz!');

let scale = getScale();
let chords = getChords(scale);

let jazz = {
    scale,
    chords
};

writeSheet(jazz);
