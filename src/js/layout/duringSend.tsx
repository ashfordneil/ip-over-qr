import * as React from 'react';

import { Sender } from '../sender';
import { HeaderPacket } from '../shared';

interface Props {
    data: string;
    mime: string;
}

interface State {
}

export class DuringSend extends React.Component<Props, State> {
    render() {
        const body = <Sender mime={this.props.mime} data={this.props.data} />;

        return <div style={{
            width: "100%",
            display: "flex",
            flexFlow: "column",
            }}
        >
            <div className="nav nav-pills nav-fill">
                <div className="nav-item nav-link active">Sending</div>
            </div>
            <div
                className="jumbotron"
                style={{
                    flex: 1,
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {body}
            </div>
        </div>;
    }
}
