import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { QrScanner } from './scanner';

const App = () => {
    const scanner = <QrScanner display=true />;
    return <div>
        <h1>Hello, world!!!</h1>
        {scanner}
    </div>;
}

ReactDOM.render(<App />, document.getElementById('main') as HTMLElement);
