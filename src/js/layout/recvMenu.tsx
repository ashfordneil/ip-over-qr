import * as React from "react";
import { Receiver } from "../receiver";

interface Props {
}

interface State {
    receiving: boolean;
}

export class RecvMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            receiving: false
        }
    }

    startReceiving() {
        this.setState({ receiving: true });
    }

    stopReceiving() {
        this.setState({ receiving: false });
    }

    render() {
        return <div className="jumbotron" style={{ flex: 1 }}>
            {
                <button
                    className="btn btn-primary"
                    onClick={() => { this.state.receiving ? this.stopReceiving() : this.startReceiving()}}
                    style={{ width: "100%" }}
                >{this.state.receiving ? "Stop" : "Go"}</button>

            }
            {
                this.state.receiving
                    ? <Receiver onFinish={(headers, content) => {
                        console.log("headers");
                        console.log(headers);
                        console.log("content");
                        console.log(content);
                    }}/>
                    : null
            }
        </div>;
    }
}
