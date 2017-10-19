const tonal = require('tonal');
const fp = require('lodash/fp');
const Tone = require('tone');
var synth = new Tone.Synth().toMaster();
var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

const getScale = () => {
    let root = _.sample(tonal.Note.names(' b'));
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
let toneChords = chords.map(chord => {
    // Tone.js requires absolute note, i.e. octave number in addition to the note name
    // Sadly some chords sound bad because of this naive implemenation, when a maj7 is played as a min2.
    // TODO: correct implementation of absolute notes!
    return tonal.Chord.notes(chord).map(note => note + '3');
});

console.log('ToneChords: ' + JSON.stringify(toneChords));

toneChords.map((toneNotes, index) => {
    Tone.Transport.scheduleRepeat(
        time => {
            polySynth.triggerAttackRelease(toneNotes, '1n', time); // Repeat a 1n = whole note long chord
        },
        '4m', // every 4 measures
        index + 'm' // at offset index measures
    );
});

Tone.Transport.start();
