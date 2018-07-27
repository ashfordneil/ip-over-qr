import * as React from 'react';
import * as QrCode from 'qrcode';

interface QRCanvasProps {
    id: string;
    input: {},
}



interface QRCanvasState {
}

export class QRCanvas extends React.Component<QRCanvasProps, QRCanvasState> {
    constructor(props: QRCanvasProps) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.generate();
    }

    generate() {
        var canv = document.getElementById(this.props.id);
        QrCode.toCanvas(canv, this.props.input, (err: any) => { if (err) { console.log("error") } else { console.log("succ") } });

    }

    render() {
        const {input, ...props} = this.props;
        return (<canvas {...props}> </canvas>)
    }
}