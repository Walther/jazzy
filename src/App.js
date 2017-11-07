import React, { Component } from 'react';
import './App.css';
import jazz from './Jazz';
import SheetViewer from './SheetViewer';
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
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Jazzy</h1>
                    <button id="playback" onClick={e => this.togglePlayback()}>
                        Play / Pause
                    </button>
                    <button id="new" onClick={e => this.newSheet()}>
                        New Jazz
                    </button>
                </header>
                <SheetViewer sheet={this.state.sheet} />
            </div>
        );
    }
}

export default App;
