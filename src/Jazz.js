const teoria = require('teoria');
const sample = require('lodash/sample');
const progressions = require('./progressions');

const getRoot = () =>
    // TODO: sane root options
    sample(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);

const getScale = (root, scaleType) => teoria.note(root).scale(scaleType);

const getProgression = () => sample(progressions.getAll());

const getChords = scale => {
    // TODO: refactor with getProgression
    let progression = getProgression();
    let notes = scale.notes();
    let chords = progression.map(({ degree, type }) => {
        return teoria.chord(notes[degree - 1], type);
    });
    return chords;
};

const prepareSheet = () => {
    let root = getRoot();
    let absoluteRoot = root + '3';
    let scaleType = 'major';
    let key = root + ' ' + scaleType;
    let scale = getScale(absoluteRoot, scaleType);
    let chords = getChords(scale);

    let sheet = {
        key,
        scale,
        chords
    };

    return sheet;
};

module.exports = {
    getJazz: prepareSheet
};
