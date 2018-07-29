import * as React from 'react';

import { SendUploader } from './sendUploader';
import { Sender } from '../sender';

interface SendThingState {
    step: 'upload' | 'sending' | 'sent' | 'cancelled';
    data: string;
    mime: string;
}

export class SendTab extends React.Component<{}, SendThingState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            step: 'upload',
            data: '',
            mime: '',
        };
    }

    render() {
        if (this.state.step === 'upload') {
            return <SendUploader
                onComplete={(data, mime) => {
                    console.log(data);
                    this.setState({ data, mime, step: 'sending' })
                }}
            />;
        } else if (this.state.step === 'sending') {
            return <div
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
                    <Sender
                        mime={this.state.mime}
                        data={this.state.data}
                        onFinish={() => this.setState({step: 'sent' })}
                        onCancel={() => this.setState({step: 'cancelled' })}
                    />
                </div>
        } else if (this.state.step === 'sent' || this.state.step === 'cancelled') {
            const alert = this.state.step === 'sent'
                ? <div className="alert alert-success">
                    Finished
                </div>
                : <div className="alert alert-warning">
                    Cancelled
                </div>;
            return <div
                    className="jumbotron"
                    style={{
                        flex: 1,
                        display: "flex",
                        flexFlow: "column",
                        alignItems: "stretch",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    {alert}
                    <div style={{ flex: 1 }} />
                    <div style={{ display: "flex", width: "100%" }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {this.setState({step: 'sending' })}}
                            style={{ flex: 1 }}
                        >Send Again</button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {this.setState({step: 'upload' })}}
                            style={{ flex: 1 }}
                        >New File</button>
                    </div>
                </div>
        }
    }
}
