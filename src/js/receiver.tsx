import * as React from 'react';
import { QrScanner } from './scanner';
import { QRCanvas } from './qrcanvas';
import getChecksum from './getChecksum';
import { Scanned } from 'instascan';

interface ReceiverProps {
}

interface ScanEntry {
    frame: number;
    content: Scanned;
    checksum: string;
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
        var reg = /^(.*)\|(\d+)$/g;
        var match = reg.exec(scanned);
        if (match) {
            const content = match[1];
            const frame = parseInt(match[2]);
            console.log(`frame ${frame}`);
        }
        else {
            console.warn("Does not match format!");
        }
        // const { scanHist, checksum } = this.state;
        // const newChecksum = getChecksum(scanned);
        // if (checksum != newChecksum) {
        //     scanHist.push(scanned);
        //     this.setState({ scanHist, checksum: newChecksum });
        // }
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
