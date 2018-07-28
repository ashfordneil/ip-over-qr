import * as React from 'react';
import { Camera, Scanner } from 'instascan';

interface Props {
    display?: boolean;
    onScan: (received: string) => void;
}

interface State {
    loading: boolean;
    failed: boolean;
    camera: any | null;
    scanner: Scanner | null;
}

export class QrScanner extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            failed: false,
            camera: null,
            scanner: null,
        };
    }

    async componentDidMount() {
        const video = document.getElementById('preview');
        const continuous = true;
        const backgroundScan = false;
        const scanner = new Scanner({ video, continuous, backgroundScan });
        this.setState({ scanner });
        try {
            const cameras = await Camera.getCameras();
            const [camera, failed] = cameras.length > 0
                ? [cameras[0], false]
                : [null, true];
            this.setState({ camera, failed });
            if (!failed) {
                this.setState({ loading: false });
                scanner.addListener('scan', c => this.props.onScan(c));
                await scanner.start(camera);
            }
        } catch (e) {
            console.warn(e);
            this.setState({ loading: false, failed: true });
        }
    }

    componentWillUnmount() {
        if (this.state.scanner) {
            this.state.scanner.stop();
        }
    }

    render() {
        const loading = this.state.loading
            ? <div>Loading...</div>
            : this.state.failed
                ? <div>No camera, no app</div>
                : null;

        const preview = this.props.display
            ? <video id='preview' />
            : null;


        return <div>
            {loading}
            {preview}
        </div>;
    }
}
