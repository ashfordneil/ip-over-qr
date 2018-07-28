import * as React from 'react';
import * as QrCode from 'qrcode';

type QRCanvasProps = {
    id: string;
    input: {},
} & React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

export class QRCanvas extends React.Component<QRCanvasProps> {
    constructor(props: QRCanvasProps) {
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
            } else {
                console.log("Success!");
            }
        }
        );
    }

    render() {
        const { input, ...props } = this.props;
        return <canvas {...props}> </canvas>
    }
}