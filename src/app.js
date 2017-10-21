const teoria = require('teoria');
const sample = require('lodash/sample');
const PolySynth = require('Tone').PolySynth;
const polySynth = new PolySynth().toMaster();
const Transport = require('Tone').Transport;

const getRoot = () =>
    // TODO: sane root options
    sample(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);

const getScale = (root, scaleType) => teoria.note(root).scale(scaleType);

const getProgression = () => {
    const progressions = [
        // TODO: this assumes major scale
        // Also, doesn't allow stuff like bII7
        // Convert to using interval notation instead of "degree"
        [
            // ii V7 I I
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
        ],
        [
            // I-vi-ii-V7
            {
                degree: 1,
                type: 'maj7'
            },
            {
                degree: 6,
                type: 'm7'
            },
            {
                degree: 2,
                type: 'm7'
            },
            {
                degree: 5,
                type: '7'
            }
        ]
    ];
    return sample(progressions);
};

const getChords = scale => {
    // TODO: refactor with getProgression
    let progression = getProgression();
    let notes = scale.notes();
    let chords = progression.map(({ degree, type }) => {
        return teoria.chord(notes[degree - 1], type);
    });
    return chords;
};

const writeSheet = data => {
    let prettyPrint = '<div id="info">';
    prettyPrint += 'Key: ' + data.key;
    prettyPrint +=
        '<br>Scale: ' +
        data.scale
            .simple()
            .map(name => (name = name[0].toUpperCase() + name.slice(1)))
            .join(', ');
    prettyPrint += '</div>';

    prettyPrint += '<table id="chords"><tr>';
    data.chords.map(chord => (prettyPrint += '<td>' + chord + '</td>'));
    prettyPrint += '</tr></table>';

    document.getElementById('app').innerHTML += prettyPrint;
};

const preparePlaybackForSheet = data => {
    data.chords.map((chord, index) => {
        let notes = chord.notes().map(note => note.toString());
        Transport.scheduleRepeat(
            time => {
                polySynth.triggerAttackRelease(notes, '1n', time); // Repeat a 1n = whole note long chord
            },
            '4m', // every 4 measures
            index + 'm' // at offset index measures
        );
    });
};

const prepareUI = () => {
    let playing = false;
    document.querySelector('#playback').addEventListener('click', event => {
        playing = !playing;
        playing ? Transport.start() : Transport.stop(); // TODO: stop immediately
    });
    document.querySelector('#new').addEventListener('click', event => {
        // TODO: actual call to re-init. NOTE: requires proper clearing of Tone Transport stack!
        location.reload();
    });
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

/* --- --- --- */

console.log('Hello, Jazz!');

let sheet = prepareSheet();
writeSheet(sheet);
preparePlaybackForSheet(sheet);
prepareUI();
