import * as React from 'react';

import { RecvMenu } from './recvMenu';
import { SendMenu } from './sendMenu';

interface Props {
    send: (data: string, mime: string) => void;
    recv: () => void;
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
        return (event) => {
            event.preventDefault();
            this.setState({ mode: input });
        }
    }

    render() {
        const recv = <RecvMenu />;
        const send = <SendMenu onComplete={this.props.send} />;

        const baseClass = "nav-item nav-link";
        const nav = <div className="nav nav-pills nav-fill">
            <a
                className={baseClass + (this.state.mode === 'send' ? ' active' : '')}
                href="#"
                onClick={this.selectNav('send')}
            >Send</a>
            <a
                className={baseClass + (this.state.mode === 'recv' ? ' active' : '')}
                href="#"
                onClick={this.selectNav('recv')}
            >Recv</a>
        </div>;

        const body = { recv, send }[this.state.mode];

        return <div style={{height: "100%", display: "flex", flexFlow: "column"}}>
            {nav}
            {body}
        </div>;
    }
}
