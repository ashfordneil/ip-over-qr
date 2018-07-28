import * as React from 'react';

import { SendUploader } from './sendUploader';
import { Sender } from '../sender';

interface SendThingState {
    step: 'upload' | 'sending';
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
            return <div>
                <button className={"btn btn-secondary"}
                    onClick={() => {
                        this.setState({
                            step: 'upload',
                            data: this.state.data,
                            mime: this.state.mime
                        })
                    }}> Back
            </button>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexFlow: "column",
                    }}
                >
                    <div className="nav nav-pills nav-fill">
                        <div className="nav-item nav-link active">Sending</div>
                    </div>
                    <div
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
                        <Sender mime={this.state.mime} data={this.state.data} />
                    </div>
                </div>
            </div>
        }
    }
}
