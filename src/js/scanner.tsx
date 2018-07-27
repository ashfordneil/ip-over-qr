import * as React from 'react';
import { Camera, Scanner } from 'instascan';

interface Props {
    display: boolean;
}

interface State {
    loading: boolean;
    failed: boolean;
    camera: any | null;
    scanner: any | null;
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
        const scanner = new Scanner({ video });
        this.setState({ scanner });
        try {
            const cameras = await Camera.getCameras();
            const [ camera, failed ] = cameras.length > 0
                ? [ cameras[0], false ]
                : [ null, true ];
            this.setState({ camera, failed });
            if (!failed) {
                await scanner.start(camera);
                this.setState({ loading: false });
            }
        } catch (e) {
            this.setState({ loading: false, failed: true });
        }
    }

    async scan() {
        if (this.state.loading || this.state.failed) {
            throw new Error('No camera to scan');
        }

        const output = await this.state.scanner.scan();
        console.log(output);
        return output;
    }

    render() {
        const loading = this.state.loading
            ?  <div>Loading...</div>
            : this.state.failed
                ? <div>No camera, no app</div>
                : null;

        const preview = this.props.display
            ? <video id='preview' />
            : null;

        const button = loading !== null
            ? null
            : <button onClick={() => this.scan()}>Hi</button>;

        return <div>
            {loading}
            {preview}
            <br />
            {button}
        </div>;
    }
}
