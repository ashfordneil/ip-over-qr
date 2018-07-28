import * as React from 'react';
import * as QrCode from 'qrcode';

type QRCanvasProps = {
    id: string;
    input: string,
} & React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

export class QRCanvas extends React.Component<QRCanvasProps> {
    constructor(props: QRCanvasProps) {
        super(props);
    }

    componentDidMount() {
        this.generate();
        //TODO: Component update
    }

    componentDidUpdate() {
        this.generate();
    }

    generate() {
        var canv = document.getElementById(this.props.id);
        QrCode.toCanvas(canv, this.props.input, (err: any) => { if (err) { console.log("error") } else { console.log("succ") } });
    }

    render() {
        const {input, ...props} = this.props;
        return <canvas {...props}> </canvas>
    }
}