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
    mime: string | null;
    frames: { [id: number]: string },
    requestedFrame: number | null;
}

export class Receiver extends React.Component<ReceiverProps, ReceiverState> {
    constructor(props: ReceiverProps) {
        super(props);
        this.state = {
            initiated: false,
            numFrames: null,
            mime: null,
            frames: [],
            requestedFrame: null,
        };
    }

    initiate(numFrames: number, mime: string) {
        this.setState({ numFrames, initiated: true, mime });
        console.log(`intiated: ${numFrames}`);
        this.requestNext();
    }

    requestNext(): boolean {
        const next = this.nextFrame();
        console.log(`next ${next}`);
        if (next !== null) {
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
            console.log(`i ${i}`);
            if (frames[i] === undefined) {
                return i;
            }
        }
        return null;
    }

    logScanned(scanned: Scanned) {
        console.log("logging...");
        console.log(scanned);
        const index = scanned.indexOf('|');
        const start = scanned.slice(0, index);
        const end = scanned.slice(index + 1);
        if (true) {
            const content = end;
            const frame = parseInt(start);
            const { requestedFrame } = this.state;
            if (requestedFrame == null) {
                throw new Error("requested frame is null, dunno how this happened");
            }
            console.log(`${frame}, ${requestedFrame}`);
            if (frame == requestedFrame) {
                console.log("yup");
                this.setState(({ frames }) => {
                    frames[frame] = content;
                    return ({ frames });
                });
                console.log("setted state");
                const isDone = this.requestNext() == false;
                if (isDone) {
                    console.log("done!");
                    console.log(this.state.frames);
                }
                else {
                    console.log("not done");
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
                        const { length, mime } = JSON.parse(scanned.content);
                        this.initiate(length, mime);
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
