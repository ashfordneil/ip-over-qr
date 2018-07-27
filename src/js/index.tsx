import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { QrScanner } from './scanner';
import { QrGenerator } from './generator';
import FileUploader from './fileuploader';
import { QRCanvas } from './qrcanvas';
import { FileQRGenerator } from './fileqrgenerator';



const App = () => {
    const scanner = <QrScanner display={true} />;
    const generator = <QrGenerator display={true} />;
    return <div>
        <h1>Hello, world!!!</h1>
        {scanner}
        {generator}
        <FileQRGenerator />
        {/* <FileUploader onUpload={(thing, stuff) => {
            console.log("got thing");
            console.log(thing);
            console.log(stuff);
        }}
        />
        <QRCanvas id="thingo" input="hello there" />
        <QRCanvas id="sutfff" input="hiya" />
        <QRCanvas id="stuff" input="the quick brown fox jumped over the lazy dog" /> */}
    </div>;
}

ReactDOM.render(<App />, document.getElementById('main') as HTMLElement);
