import * as React from 'react';
import { QrScanner } from './scanner';
import { QRCanvas } from './qrcanvas';
import { Scanned } from 'instascan';

interface ReceiverProps {
}

// interface ScanEntry {
//     frame: number;
//     content: Scanned;
// }

interface ReceiverState {
    initiated: boolean;
    numFrames: number | null;
    frames: { [id: number]: string },
    requestedFrame: number | null;
}

export class Receiver extends React.Component<ReceiverProps, ReceiverState> {
    constructor(props: ReceiverProps) {
        super(props);
        this.state = {
            initiated: false,
            numFrames: null,
            frames: [],
            requestedFrame: null,
        };
    }

    initiate(numFrames: number) {
        this.setState({ numFrames, initiated: true });
        this.requestNext();
    }

    requestNext(): boolean {
        const next = this.nextFrame();
        if (next) {
            this.setState({ requestedFrame: next });
            return true;
        } else {
            return false;
        }
    }

    nextFrame(): number | null {
        const { numFrames, frames } = this.state;
        if (numFrames == null) {
            throw new Error("Need num frames");
        }
        for (let i = 0; i < numFrames; i++) {
            if (!(frames[i])) {
                return i;
            }
        }
        return null;
    }

    logScanned(scanned: Scanned) {
        var reg = /^(.*)\|(\d+)$/g;
        var match = reg.exec(scanned);
        if (match) {
            const content = match[1];
            const frame = parseInt(match[2]);
            const { requestedFrame } = this.state;
            if (requestedFrame == null) {
                throw new Error("requested frame is null, dunno how this happened");
            }
            if (frame == requestedFrame) {
                this.setState(({ frames }) => {
                    frames[frame] = content;
                    return ({ frames });
                });
                const isDone = this.requestNext();
                if (isDone) {
                    console.log("done!");
                    console.log(this.state.frames);
                }
            }
        }
        else {
            console.warn("Does not match format!");
        }
    }

    render() {
        return <>
            {
                this.state.requestedFrame !== null
                    ? <QRCanvas id="nextFrame" input={this.state.requestedFrame.toString()} />
                    : null
            }
            <QrScanner
                autoscan
                onScan={(scanned) => {
                    if (scanned == null) {
                        return;
                    }
                    if (!this.state.initiated) {
                        const { numFrames } = JSON.parse(scanned.content);
                        this.initiate(numFrames);
                    }
                    else {
                        console.log("scanned!");
                        console.log(scanned);
                        this.logScanned(scanned.content);
                    }
                }} />
        </>;
    }
}
