import * as React from 'react';

import { QRCanvas } from '../qrcanvas';

interface Props {
    data: string;
    mime: string;
}

interface State {
}

export class DuringSend extends React.Component<Props, State> {
    render() {
        const body = <QRCanvas id="sending-canvas" input={this.props.data} style={{minWidth: "80%", minHeight: "80%" }} />;

        return <div style={{height: "100%", display: "flex", flexFlow: "column"}}>
            <div className="nav nav-pills nav-fill">
                <div className="nav-item nav-link active">Sending</div>
            </div>
            <div className="jumbotron" style={{ flex: 1, display: "flex", flexFlow: "column", alignItems: "center" justifyContent: "center" }}>
                {body}
            </div>
        </div>;
    }
}
