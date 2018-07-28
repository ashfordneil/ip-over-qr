import * as React from 'react';

import { DuringSend } from './layout/duringSend';
import { StartupMenu } from './layout/startupMenu';

interface State {
    view: 'menu' | 'sending';
    data: string;
    mime: string;
}

export class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            view: 'menu',
            data: '',
            mime: '',
        };
    }

    render() {
        if (this.state.view === 'menu') {
            return <StartupMenu
                send={(data, mime) => {
                    console.log(data);
                    this.setState({ data, mime, view: 'sending' })
                }}
                recv={() => { }}
            />;
        } else if (this.state.view === 'sending') {

            return <div>
                <button className={"btn btn-secondary"}
                    onClick={() => {
                        this.setState({
                            view: 'menu',
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
