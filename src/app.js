const tonal = require('tonal');
const fp = require('lodash/fp');

const getScale = () => {
    let root = _.sample(tonal.Note.names());
    let scaleType = 'major';
    let scale = tonal.Scale.notes(root, scaleType);
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
    let chords = progression.map(
        ({ degree, type }) => scale[degree - 1] + type
    );
    return chords;
};

console.log('Hello, Jazz!');
let scale = getScale();
console.log("Here's a scale for you: " + scale);
console.log('Here are chords for a ii V I in it:' + getChords(scale));
