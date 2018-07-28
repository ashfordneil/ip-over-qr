import * as React from 'react';
import { QrScanner } from './scanner';
import { QRCanvas } from './qrcanvas';
import getChecksum from './getChecksum';
import { Scanned } from 'instascan';

interface ReceiverProps {
}

interface ReceiverState {
    scanHist: Scanned[],
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

    logScanned(scanned: Scanned) {
        const { scanHist, checksum } = this.state;
        const newChecksum = getChecksum(scanned, scanHist.length);
        if (checksum != newChecksum) {
            scanHist.push(scanned);
            this.setState({ scanHist, checksum: newChecksum });
        }
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
                // display
                // showAutoToggle
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
