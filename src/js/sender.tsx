import * as React from 'react';

import { QRCanvas } from './qrcanvas';
import { QrScanner } from './scanner';
import { QR_CODE_LENGTH, HeaderPacket, STOP_CODE } from './shared';
import ProgressBar from './progressbar';

interface Props {
    mime: string;
    data: string;
}

interface State {
    current: null | number;
    finished: boolean;
}

export class Sender extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            current: null,
            finished: false,
        };
    }

    render() {
        const { current, finished } = this.state;
        const { mime, data } = this.props;
        if (finished) {
            return <div>Done!</div>;
        }

        const length = Math.ceil(data.length / QR_CODE_LENGTH);
        const payload = (current === null)
            ? JSON.stringify({ mime, length } as HeaderPacket)
            : `${current}|${data.slice(current * QR_CODE_LENGTH, (current + 1) * QR_CODE_LENGTH)}`;

        const qr = <QRCanvas input={payload} />;

        const input = <QrScanner
            display={false}
            onScan={content => {
                if (content === STOP_CODE) {
                    console.log("finished");
                    this.setState({finished: true});
                } else {
                    try {
                        const num = parseInt(content);
                        if (isNaN(num)) {
                            throw new Error("Invalid number");
                        } else if (num >= length) {
                            throw new Error("Invalid frame number");
                        } else {
                            this.setState({ current: num });
                        }
                    } catch (e) {
                        console.warn("error: ", e);
                    }
                }
            }}
        />;

        return <>
            {input}
            {qr}
            {
                current !== null
                    ? <div style={{"width": "100%"}}>
                        <br />
                        <ProgressBar
                            current={current}
                            total={length}
                        />
                    </div>
                    : null
            }
        </>;
    }
}
