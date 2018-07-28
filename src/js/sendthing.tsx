import * as React from 'react';

import { DuringSend } from './layout/duringSend';
import { StartupMenu } from './layout/startupMenu';
import { SendMenu } from './layout/sendMenu';

interface SendThingState {
    step: 'upload' | 'sending';
    data: string;
    mime: string;
}

export class SendThing extends React.Component<{}, SendThingState> {
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
            return <SendMenu
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
                <DuringSend data={this.state.data} mime={this.state.mime} />
            </div>
        }
    }
}
