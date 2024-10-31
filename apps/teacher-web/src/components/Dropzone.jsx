import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    //flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#cccccc',
    borderStyle: 'dashed',
    //outline: 'none',
    transition: 'border .24s ease-in-out',
    
    backgroundColor: 'inherit',
    color: 'inherit',
    width: '25%',
    maxHeight: '200px'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function Dropzone(props) {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv'],
            'application/vnd.oasis.opendocument.spreadsheet': ['.ods']
        },
        maxFiles: 1
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Arraste e solte uma planilha aqui</p>
                <p>Ou clique para selecionar arquivo</p>
            </div>
        </div>
    );
}