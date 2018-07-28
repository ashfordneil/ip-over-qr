import * as React from 'react';
import * as QrCode from 'qrcode';

type Props = {
    id: string;
    input: string,
}

export class QRCanvas extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.generate();
    }

    componentDidUpdate() {
        this.generate();
    }

    generate() {
        const { id, input } = this.props;
        var canv = document.getElementById(id) as HTMLCanvasElement;
        QrCode.toCanvas(canv, input, (err: any) => {
            if (err) {
                console.warn("Error creating QR");
                console.warn(err);
                const context = canv.getContext('2d');
                if (context) {
                    context.clearRect(0, 0, canv.width, canv.height);
                }
            }
        }
        );
    }

    render() {
        const { input, id } = this.props;
        return <div style={{ width: "100%", height: "100%" }}>
            <canvas id={id} style={{ minWidth: "80%", minHeight: "80%" }} />
        </div>;
    }
}
