import * as React from 'react';
import * as QrCode from 'qrcode';

interface Props {
    display: boolean
}

interface State {
    input: string;
}

export class QrGenerator extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            input: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.SyntheticEvent){
        var canv = document.getElementById("qrcodecanv");
        QrCode.toCanvas(canv, this.state.input, (err: any) => {if(err){console.log("error")} else {console.log("succ")}});
        
    } 

    handleChange(event: React.SyntheticEvent){
        this.setState({input: (event.target as HTMLInputElement).value});
    }

    render(){
        return (
            <div>
            <div>
                <label>
                    Name:
                    <input type="text" name="name" value={this.state.input} onChange={this.handleChange}/>
                </label>
                <button onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
            <div id={"qrcode"}>
                <canvas id={"qrcodecanv"}> </canvas>
            </div>
            </div>
        )
    }
}