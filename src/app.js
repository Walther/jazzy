const tonal = require('tonal');
const fp = require('lodash/fp');
const Tone = require('tone');
var synth = new Tone.Synth().toMaster();

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
let toneNotes = chords.map(chord => {
    let root = tonal.Chord.notes(chord)[0];
    return root + '3';
    // TODO: saner handling.
    // Tone requires absolute note, and doesn't tolerate double sharps
});

console.log('ToneNotes: ' + toneNotes);

toneNotes.map((toneNote, index) => {
    Tone.Transport.scheduleRepeat(
        function(time) {
            synth.triggerAttackRelease(toneNote, '1n', time);
        },
        '4m',
        index + 'm'
    );
});

Tone.Transport.start();
