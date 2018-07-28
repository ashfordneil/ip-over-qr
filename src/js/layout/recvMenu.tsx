import * as React from "react";

interface Props {
    ready: () => void;
}

interface State {
}

export class RecvMenu extends React.Component<Props, State> {
    render() {
        return <div className="jumbotron" style={{ flex: 1 }}>
            <button
                className="btn btn-primary"
                onClick={() => this.props.ready()}
                style={{ width: "100%" }}
            >Go</button>
        </div>;
    }
}
