import * as React from 'react';

import { QRCanvas } from './components/qrcanvas';
import { QrScanner } from './components/qrscanner';
import { QR_CODE_LENGTH, HeaderPacket, STOP_CODE } from './shared';
import ProgressBar from './components/progressbar';

interface Props {
    mime: string;
    data: string;
    onFinish: () => void;
    onCancel: () => void;
}

interface State {
    current: null | number;
}

export class Sender extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            current: null,
        };
    }

    render() {
        const { current } = this.state;
        const { mime, data } = this.props;

        const length = Math.ceil(data.length / QR_CODE_LENGTH);
        const payload = (current === null)
            ? JSON.stringify({ mime, length } as HeaderPacket)
            : `${current}|${data.slice(current * QR_CODE_LENGTH, (current + 1) * QR_CODE_LENGTH)}`;

        const qr = <QRCanvas input={payload} />;

        const input = <QrScanner
            display={false}
            onScan={content => {
                if (content === STOP_CODE) {
                    this.props.onFinish();
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
            <ProgressBar
                current={current || 0}
                total={length}
            />
            <br />
            <div style={{ display: "flex", width: "100%" }}>
                <button
                    className="btn btn-secondary"
                    onClick={() => {this.setState({ current: null })}}
                    style={{ flex: 1}}
                >Restart</button>
                <button
                    className="btn btn-warning"
                    onClick={() => {this.props.onCancel()}}
                    style={{ flex: 1}}
                >Stop</button>
            </div>
        </>;
    }
}
