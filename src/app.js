const teoria = require('teoria');
const fp = require('lodash/fp');
const Tone = require('tone');
var synth = new Tone.Synth().toMaster();
var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

const getRoot = () =>
    // TODO: sane root options
    _.sample(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);

const getScale = (root, scaleType) => teoria.note(root).scale(scaleType);

const getChords = scale => {
    //TODO: this assumes major scale
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
    let notes = scale.notes();
    let chords = progression.map(({ degree, type }) => {
        return teoria.chord(notes[degree - 1], type);
    });
    return chords;
};

const writeSheet = data => {
    let prettyPrint = '';
    prettyPrint += 'Key: ' + data.key;
    prettyPrint += '<br>Scale: ' + data.scale;
    prettyPrint += '<br>Chords: ' + data.chords.join(', ');

    document.getElementById('jazz').innerHTML = prettyPrint;
};

const playSheet = data => {
    data.chords.map((chord, index) => {
        let notes = chord.notes().map(note => note.toString());
        Tone.Transport.scheduleRepeat(
            time => {
                polySynth.triggerAttackRelease(notes, '1n', time); // Repeat a 1n = whole note long chord
            },
            '4m', // every 4 measures
            index + 'm' // at offset index measures
        );
    });

    Tone.Transport.start();
};

/* --- --- --- */

console.log('Hello, Jazz!');

let root = getRoot();
let absoluteRoot = root + '3';
let scaleType = 'major';
let key = root + ' ' + scaleType;
let scale = getScale(absoluteRoot, scaleType);
let chords = getChords(scale);

let jazz = {
    key,
    scale: scale.simple(),
    chords
};

writeSheet(jazz);
playSheet(jazz);
