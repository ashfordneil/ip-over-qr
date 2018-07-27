import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { QrScanner } from './scanner';
import { QrGenerator } from './generator';
import FileUploader from './fileuploader';

const App = () => {
    const scanner = <QrScanner display={true} />;
    const generator = <QrGenerator display={true} />;
    return <div>
        <h1>Hello, world!!!</h1>
        {scanner}
        {generator}
        <FileUploader onUpload={(thing, stuff) => {
            console.log("got thing");
            console.log(thing);
            console.log(stuff);
        }}
        />
    </div>;
}

ReactDOM.render(<App />, document.getElementById('main') as HTMLElement);
