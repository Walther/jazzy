import React from 'react';

class SheetViewer extends React.Component {
    writeScale = scale =>
        scale
            .simple()
            .map(name => (name = name[0].toUpperCase() + name.slice(1)))
            .join(', ');
    writeChords = chords => {
        return chords.map(chord => (
            <span className="chord">
                {chord.root.name().toUpperCase()}
                {chord.root.accidental()}
                <sup>{chord.symbol}</sup>
            </span>
        ));
    };
    render() {
        const sheet = this.props.sheet;
        return (
            <div id="sheet">
                <div id="info">
                    <p>Key: {sheet.key}</p>
                    <p>Scale: {this.writeScale(sheet.scale)}</p>
                </div>
                <div id="chords">{this.writeChords(sheet.chords)}</div>
            </div>
        );
    }
}

export default SheetViewer;
