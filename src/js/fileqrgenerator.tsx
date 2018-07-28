import * as React from 'react';
import FileUploader from './fileuploader';
import { QRCanvas } from './qrcanvas';

interface FileQRGeneratorProps {
}

interface FileQRGeneratorState {
    uploadedStuff?: {},
}

export class FileQRGenerator extends React.Component<FileQRGeneratorProps, FileQRGeneratorState> {
    constructor(props: FileQRGeneratorProps) {
        super(props);
        this.state = {
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSubmit(event: React.SyntheticEvent){
    //     var canv = document.getElementById("qrcodecanv");
    //     QrCode.toCanvas(canv, this.state.input, (err: any) => {if(err){console.log("error")} else {console.log("succ")}});

    // } 

    // handleChange(event: React.SyntheticEvent){
    //     this.setState({input: (event.target as HTMLInputElement).value});
    // }

    render() {
        return (
            <>
                <FileUploader className={"btn btn-default btn-file"} onUpload={(thing, stuff) => {
                    // console.log("got thing");
                    // console.log(thing);
                    // console.log(stuff);
                    this.setState({ uploadedStuff: stuff });
                }}
                />
                {
                    this.state.uploadedStuff
                        ? <QRCanvas id="thingooooo" input={this.state.uploadedStuff} />
                        : null
                }
            </>
        )
    }
}