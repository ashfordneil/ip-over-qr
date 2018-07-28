import * as React from 'react';

import { RecvTab } from './recvTab';
import { SendUploader } from './sendUploader';
import { SendTab } from './sendTab';

interface Props {
    // send: (data: string, mime: string) => void;
    // recv: () => void;
}

interface State {
    mode: 'send' | 'recv';
}

export class StartupMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            mode: 'send',
        };
    }

    selectNav(input: 'send' | 'recv') {
        return ((event) => {
            event.preventDefault();
            this.setState({ mode: input });
        }) as React.MouseEventHandler<{}>
    }

    render() {
        const {mode} = this.state;

        const recv = <RecvTab />;
        const send = <SendTab />;

        const baseClass = "nav-item nav-link";
        const nav = <div className="nav nav-pills nav-fill">
            <a
                className={baseClass + (mode === 'send' ? ' active' : '')}
                href="#"
                onClick={this.selectNav('send')}
            >Send</a>
            <a
                className={baseClass + (mode === 'recv' ? ' active' : '')}
                href="#"
                onClick={this.selectNav('recv')}
            >Recv</a>
        </div>;

        const body = { recv, send }[mode];

        return <div style={{height: "100%", display: "flex", flexFlow: "column"}}>
            {nav}
            {body}
        </div>;
    }
}
