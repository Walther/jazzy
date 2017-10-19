const tonal = require('tonal');
const fp = require('lodash/fp');

const getScale = () => {
    let root = _.sample(tonal.Note.names());
    let scaleType = 'major';
    let scale = tonal.Scale.notes(root, scaleType);
    return scale;
};

console.log('Hello, Jazz!');
console.log("Here's a scale for you: " + getScale());
