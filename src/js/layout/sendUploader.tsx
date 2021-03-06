import * as React from "react";

interface Props {
    onComplete: (input: string, mime: string) => void;
}

interface State {
    data: string;
    dataUrl: string;
    mime: string;
    inputType: 'null' | 'file' | 'text';
}

export class SendUploader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: '',
            dataUrl: '',
            mime: '',
            inputType: 'null',
        };
    }

    onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (event.target == null) {
            return;
        }
        const input = event.target.value;
        if (input) {
            const dataUrl = `data:text/plain;base64,${btoa(input)}`;
            this.setState({
                data: input,
                dataUrl,
                mime: 'text/plain',
                inputType: 'text',
            });
        } else {
            this.setState({
                data: '',
                mime: '',
                inputType: 'null',
            });
        }
    }

    onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target == null) {
            return;
        }
        const reader = new FileReader();
        const files = event.target.files;
        if (files === null) {
            return;
        }

        const selectedFile = files[0];
        reader.onload = () => {
            const dataUrl = reader.result;
            this.setState({
                data: '',
                dataUrl,
                mime: selectedFile.type,
                inputType: 'file',
            });
        }

        reader.readAsDataURL(selectedFile);
    }

    render() {
        const textIn = <textarea
            className="form-control"
            value={this.state.inputType === 'text' ? this.state.data : ''}
            onChange={event => this.onTextChange(event)}
            disabled={this.state.inputType === 'file'}
            style={{ flex: 1 }}
        />;
        const fileIn = <div className="input-group">
            <input
                id="fileUpload"
                type="file"
                className="custom-file-input"
                onChange={event => this.onFileChange(event)}
            />
            <label
                htmlFor="fileUpload"
                className="custom-file-label"
            >{this.state.mime || 'Upload file'}</label>
        </div>;

        const go = <button
            className="btn btn-primary"
            disabled={this.state.inputType === 'null'}
            onClick={() => this.props.onComplete(this.state.dataUrl, this.state.mime)}
            style={{ flex: 1 }}
        >Go</button>;

        const cancel = <button
            className="btn btn-secondary"
            disabled={this.state.inputType === 'null'}
            onClick={() => this.setState({ data: '', mime: '', inputType: 'null' })}
            style={{ flex: 1 }}
        >Clear</button>;

        return <div className="jumbotron" style={{display: "flex", flexFlow: "column", flex: 1}}>
            {textIn}
            {fileIn}
            <div style={{ display: "flex" }}>
                {cancel}
                {go}
            </div>
        </div>;
    }
}
