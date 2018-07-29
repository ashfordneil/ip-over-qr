import * as React from "react";
import { Receiver } from "../receiver";

interface Props {
}

interface State {
    step: 'waiting' | 'going' | 'finished' | 'cancelled'
}

function download(dataUrl: string) {
    const element = document.createElement('a');
    element.href = dataUrl;
    element.style.display = 'none';
    element.setAttribute('download', 'download');
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  

export class RecvTab extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            step: 'waiting'
        }
    }

    render() {
        const alert = {
            waiting: null,
            going: null,
            finished: <div style={{ width: "100%" }} className="alert alert-success">Finished</div>,
            cancelled: <div style={{ width: "100%" }} className="alert alert-warning">Cancelled</div>,
        }[this.state.step];

        const main = this.state.step === 'going' || this.state.step === 'finished'
            ? <Receiver
                onFinish={(headers, content) => {
                    download(content);
                    this.setState({ step: 'finished' });
                }}
                onCancel={() => this.setState({ step: 'cancelled' })}
            />
            : <button
                className="btn btn-primary"
                onClick={() => { this.setState({ step: 'going' }) }}
                style={{ width: "100%" }}
            >Go</button>;

        return <div className="jumbotron" style={{ flex: 1, display: "flex", alignItems: "center", flexFlow: "column" }}>
            {alert}
            <div style={{ flex: 1 }} />
            {main}
        </div>;
    }
}
