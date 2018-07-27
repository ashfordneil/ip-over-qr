import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { QrScanner } from './scanner';
import { QrGenerator } from './generator';

const App = () => {
    const scanner = <QrScanner display={true} />;
    const generator = <QrGenerator display={true} />;
    return <div>
        <h1>Hello, world!!!</h1>
        {scanner}
        {generator}
    </div>;
}

ReactDOM.render(<App />, document.getElementById('main') as HTMLElement);
