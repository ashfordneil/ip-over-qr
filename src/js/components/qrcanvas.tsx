import * as React from 'react';
import * as QrCode from 'qrcode';

interface Props {
    input: string;
}

interface State {
    url: string | null;
    oldInput: string | null;
}

export class QRCanvas extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            url: null,
            oldInput: null,
        };
    }

    componentDidMount() {
        this.generate();
    }

    componentDidUpdate() {
        this.generate();
    }

    generate() {
        const { input } = this.props;
        const { oldInput } = this.state;
        if (input !== oldInput) {
            QrCode.toDataURL(input, (err: any, url: string) => {
                if (err) {
                    console.warn("Error creating QR");
                    console.warn(err);
                }

                this.setState({ url, oldInput: input });
            });
        }
    }

    render() {
        const { input } = this.props;
        return <div style={{ flex: 1, display: "flex", flexFlow: "column", width: "100%", maxWidth: "calc(100vh - 16em)" }}>
            <img src={this.state.url || undefined} alt="Loading QR Code" style={{
                flex: 1,
                objectFit: "contain",
            }}/>
        </div>;
    }
}
