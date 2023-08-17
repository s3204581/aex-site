import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Paper, Typography, Box, Icon, Snackbar, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';

function EmailScanDropzone() {
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState('info');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];  // Assuming one file at a time

        const formData = new FormData();
        formData.append('emailFile', file);

        fetch('http://localhost:3001/scan', {  
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'clean') {
                setMessage('The email file is clean.');
                setSeverity('success');
            } else if (data.status === 'infected') {
                setMessage('Warning! The email file may contain malware.');
                setSeverity('error');
            }
        })
        .catch(error => {
            setMessage('An error occurred while scanning.');
            setSeverity('error');
        });
    }, []);

    const testConnection = () => {
        fetch('http://localhost:3001/test')
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
                setSeverity('info');
            })
            .catch(error => {
                setMessage('Failed to connect to backend.');
                setSeverity('error');
            });
    };

    const handleClose = () => {
        setMessage(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.eml, .msg',
    });

    return (
        <Container style={{ marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom>
                Email File Scanner
            </Typography>
            <Paper elevation={3} style={{ padding: '40px', textAlign: 'center' }}>
                <Box {...getRootProps()} style={{ padding: '20px', border: '2px dashed gray', borderRadius: '4px' }}>
                    <input {...getInputProps()} />
                    <Icon component={CloudUploadIcon} style={{ fontSize: '48px', color: 'gray' }} />
                    <Typography variant="h6" style={{ marginTop: '16px' }}>
                        {isDragActive ? "Drop the email files here" : "Drag & drop email files or click to select"}
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: '8px', color: 'gray' }}>
                        Supported formats: .eml, .msg
                    </Typography>
                </Box>
                <Box style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={testConnection}>Test Connection to Backend</Button>
                </Box>
            </Paper>
            <Snackbar open={message !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default EmailScanDropzone;
