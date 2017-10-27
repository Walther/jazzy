import React, { Component } from 'react';
import './App.css';
import jazz from './Jazz';
const PolySynth = require('tone').PolySynth;
const polySynth = new PolySynth().toMaster();
const Transport = require('tone').Transport;

class App extends Component {
    constructor(props) {
        super(props);
        let sheet = jazz.getJazz();
        this.preparePlaybackForSheet(sheet);
        this.state = {
            playing: false,
            sheet
        };
        this.togglePlayback = this.togglePlayback.bind(this);
    }

    preparePlaybackForSheet(sheet) {
        sheet.chords.map((chord, index) => {
            let notes = chord.notes().map(note => note.toString());
            Transport.scheduleRepeat(
                time => {
                    polySynth.triggerAttackRelease(notes, '1n', time); // Repeat a 1n = whole note long chord
                },
                '4m', // every 4 measures
                index + 'm' // at offset index measures
            );
            return notes;
        });
    }
    togglePlayback() {
        this.setState(
            { ...this.state, playing: !this.state.playing },
            callback => {
                this.state.playing ? Transport.start() : Transport.stop(); // TODO: stop immediately
            }
        );
    }
    newSheet() {
        // TODO: proper state change
        window.location.reload();
    }
    render() {
        const writeSheet = data => {
            //TODO: flexbox approach?
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
            return { __html: prettyPrint };
        };
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Jazzy</h1>
                    <button id="playback" onClick={e => this.togglePlayback()}>
                        Play / Pause
                    </button>
                    <button id="new" onClick={e => this.newSheet()}>
                        New jazz
                    </button>
                </header>
                <div dangerouslySetInnerHTML={writeSheet(this.state.sheet)} />
            </div>
        );
    }
}

export default App;
