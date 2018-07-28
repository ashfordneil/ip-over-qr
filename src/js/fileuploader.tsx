import * as React from 'react';

interface FileUploaderProps {
    // onUpload: (contents: {}) => void;
    onUpload: (file: File, contents: {}) => void;
}

interface FileUploaderState {

}

class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {
    constructor(props: FileUploaderProps) {
        super(props);
    }

    render() {
        const {onUpload} = this.props;
        return <>
            <input type="file" 
                   className="btn btn-default btn-file" 
              onChange={(event) => {
                var reader = new FileReader();
                var files = event.target.files;
                if (files != null) {
                    console.log(files);
                    var selectedFile = files[0];
                    console.log("selected file");
                    console.log(selectedFile);
                    reader.onload = (evvv) => {
                        // evvv.
                        console.log("evvv!");
                        console.log(evvv);
                        console.log(this);
                        console.log(reader);
                        var arrayBuffer = reader.result;
                        var array = new Uint8Array(arrayBuffer);
                        var binaryString = String.fromCharCode.apply(null, array);
                        // console.log(binaryString);
                        // onUpload(binaryString);
                        onUpload(selectedFile, binaryString);
                    }
                    reader.readAsArrayBuffer(selectedFile);
                }
            }} />
        </>
    }
}


// const FileUploader = () => {
//     return <div>
//         <h1>Hello, world!!!</h1>
//     </div>;
// }

export default FileUploader;