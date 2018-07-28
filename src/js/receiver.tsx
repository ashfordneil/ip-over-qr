import * as React from 'react';
import { QrScanner } from './scanner';
import { QRCanvas } from './qrcanvas';
import getChecksum from './getChecksum';

interface ReceiverProps {
}

interface ReceiverState {
    scanHist: {}[],
    checksum: string | null;
}

export class Receiver extends React.Component<ReceiverProps, ReceiverState> {
    constructor(props: ReceiverProps) {
        super(props);
        this.state = {
            scanHist: [],
            checksum: null,
        };
    }

    logScanned(scanned: {}) {
        this.setState(({ scanHist }) => {
            scanHist.push(scanned);
            const checksum = getChecksum(scanned);
            return ({ scanHist, checksum })
        });
    }

    render() {
        return <>
            {
                this.state.checksum !== null
                    ? <QRCanvas id="checksum" input={this.state.checksum} />
                    : null
            }
            <QrScanner
                autoscan
                display
                showAutoToggle
                onScan={(scanned) => {
                    if (scanned != null) {
                        console.log("scanned!");
                        console.log(scanned);
                        this.logScanned(scanned.content);
                    }
                }} />
        </>;
    }
}
