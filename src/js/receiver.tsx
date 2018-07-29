import * as React from 'react';
import { QrScanner } from './components/qrscanner';
import { QRCanvas } from './components/qrcanvas';
import { Scanned } from 'instascan';
import { HeaderPacket, STOP_CODE } from './shared';
import ProgressBar from './components/progressbar';

interface ReceiverProps {
    onFinish: (headers: HeaderPacket, content: string) => void;
    onCancel: () => void,
}

interface ReceiverState {
    initiated: boolean;
    numFrames: number | null;
    mime: string | null;
    frames: { [id: number]: string },
    requestedFrame: number | null;
    isDone: boolean;
    numProcessed: number;
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
            isDone: false,
            numProcessed: 0,
        };
    }

    initiate(numFrames: number, mime: string) {
        this.setState({ numFrames, initiated: true, mime, isDone: false, numProcessed: 0 });
        this.requestNext();
    }

    requestNext(): boolean {
        const next = this.nextFrame();
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
            if (frames[i] === undefined) {
                return i;
            }
        }
        return null;
    }

    logScanned(scanned: Scanned) {
        const index = scanned.indexOf('|');

        if (index >= 0) {
            const content = scanned.slice(index + 1);
            const frame = parseInt(scanned.slice(0, index));
            if (isNaN(frame)) {
                console.warn(`not a number! ${frame}`);
                return;
            }
            const { requestedFrame } = this.state;
            if (requestedFrame == null) {
                throw new Error("requested frame is null, dunno how this happened");
            }
            if (frame == requestedFrame) {
                this.setState(({ frames, numProcessed, }) => {
                    frames[frame] = content;
                    numProcessed++;
                    return ({ frames, numProcessed });
                });
                const isDone = this.requestNext() == false;
                if (isDone) {
                    let doneStr = '';
                    for (let i = 0; i < (this.state.numFrames as number); i++) {
                        doneStr += this.state.frames[i];
                    }
                    this.props.onFinish({
                        length: this.state.numFrames as number,
                        mime: this.state.mime as string,
                    }, doneStr);
                    this.setState({ isDone: true });
                }
            }
        } else {
            console.warn("Does not match format!");
        }
    }

    render() {
        const progress = this.state.initiated && this.state.numFrames !== null
            ? { current: this.state.numProcessed, total: this.state.numFrames }
            : { current: 0, total: 1 };
        return <>
            {
                this.state.isDone
                    ? <>
                        <QRCanvas input={STOP_CODE} />
                        <button
                            className="btn btn-primary"
                            onClick={() => this.setState({
                                initiated: false ,
                                numFrames: null,
                                mime: null,
                                frames: [],
                                requestedFrame: null,
                                isDone: false,
                                numProcessed: 0,
                            })}
                            style={{ width: "100%" }}
                        >Go</button>
                    </>
                    : <>
                        {
                            this.state.requestedFrame !== null
                                ? <QRCanvas input={this.state.requestedFrame.toString()} />
                                : null
                        }
                        <ProgressBar
                            current={progress.current}
                            total={progress.total}
                        />
                        <div style={{ display: "flex", width: "100%" }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => this.setState({
                                    initiated: false ,
                                    numFrames: null,
                                    mime: null,
                                    frames: [],
                                    requestedFrame: null,
                                    isDone: false,
                                    numProcessed: 0,
                                })}
                                style={{ flex: 1 }}
                            >Restart</button>
                            <button
                                className="btn btn-warning"
                                onClick={() => this.props.onCancel()}
                                style={{ flex: 1 }}
                            >Cancel</button>
                        </div>
                        <QrScanner
                            onScan={(scanned) => {
                                if (!this.state.initiated) {
                                    try {
                                        const { length, mime } = JSON.parse(scanned) as HeaderPacket;
                                        this.initiate(length, mime);
                                    } catch (ex) {
                                        console.warn(ex);
                                    }
                                }
                                else {
                                    this.logScanned(scanned);
                                }
                            }} />
                    </>
            }

        </>;
    }
}
