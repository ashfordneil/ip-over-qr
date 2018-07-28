import * as React from 'react';
import * as QrCanv from './qrcanvas';

interface Props {
    display: boolean
}

interface State {
    input: string,
}

export class QrGenerator extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            input: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.SyntheticEvent){
        this.setState({input: (event.target as HTMLInputElement).value});
    }

    render(){
        return (
            <div>
            <div>
                <label>
                    <h3>Live text input:</h3>
                    <input type="text" name="name" value={this.state.input} onChange={this.handleChange}
                    className={"form-control"}/>
                </label>
            </div>
            <QrCanv.QRCanvas input={this.state.input}/>
            </div>
    )
    }
}