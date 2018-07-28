import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { QrScanner } from './scanner';
import { QrGenerator } from './generator';
import FileUploader from './fileuploader';
import { QRCanvas } from './qrcanvas';
import { FileQRGenerator } from './fileqrgenerator';
import '../style.css'

interface State {
    showing: 'null' | 'scanner' | 'generator';
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showing: 'null',
        }
    }

    render() {
        const headings = <div>
            <button onClick={() => this.setState({showing: 'scanner'})}>Scanner</button>
            <button onClick={() => this.setState({showing: 'generator'})}>Generator</button>
        </div>;

        const scanner = <QrScanner display={true} />;
        const generator = <QrGenerator display={true} />;

        const main = { scanner, generator, 'null': null }[this.state.showing];
        console.log(main, scanner);

        return <div>
            {headings}
            {main}
        </div>
    }
}


ReactDOM.render(<App />, document.getElementById('main') as HTMLElement);
