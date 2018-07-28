import * as React from 'react';
import { Camera, Scanner } from 'instascan';

interface Props {
    display?: boolean;
    showButton?: boolean;
    autoscan?: boolean;
    scanInterval?: number;
    showAutoToggle?: boolean;
    onScan: (received: {}) => void;
}

interface State {
    loading: boolean;
    failed: boolean;
    camera: any | null;
    scanner: any | null;
    interval: NodeJS.Timer | null;
}

export class QrScanner extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            failed: false,
            camera: null,
            scanner: null,
            interval: null,
        };
    }

    async componentDidMount() {
        const video = document.getElementById('preview');
        const scanner = new Scanner({ video });
        this.setState({ scanner });
        try {
            const cameras = await Camera.getCameras();
            const [camera, failed] = cameras.length > 0
                ? [cameras[0], false]
                : [null, true];
            this.setState({ camera, failed });
            if (!failed) {
                await scanner.start(camera);
                this.setState({ loading: false });
                if (this.props.autoscan) {
                    this.startAutoscan();
                }

            }
        } catch (e) {
            this.setState({ loading: false, failed: true });
        }
    }

    componentWillUnmount() {
        this.stopAutoscan();
        this.state.scanner.stop();
    }

    startAutoscan() {
        var interval = setInterval(
            () => {
                this.scan();
            }
            , this.props.scanInterval || 1000);
        this.setState({ interval });
    }

    stopAutoscan() {
        const { interval } = this.state;
        if (interval) {
            clearInterval(interval);
        }
        this.setState({ interval: null })
    }

    async scan() {
        if (this.state.loading || this.state.failed) {
            throw new Error('No camera to scan');
        }

        const output = await this.state.scanner.scan();
        this.props.onScan(output);
        return output;
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
            <br />
            {
                (!(this.props.showButton) || (loading !== null))
                    ? null
                    : <button onClick={() => this.scan()}>Scan</button>
            }
            {
                this.props.showAutoToggle
                    ? <button onClick={() =>
                        this.state.interval
                            ? this.stopAutoscan()
                            : this.startAutoscan()
                    }>
                        {
                            this.state.interval
                                ? 'Stop autoscanning'
                                : 'Start autoscanning'
                        }
                    </button>
                    : null
            }
        </div>;
    }
}
