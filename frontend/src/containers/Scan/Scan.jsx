import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Paper, Typography, Box, Icon, Snackbar, Button, Card, List, ListItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';

function EmailScanDropzone() {
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState('info');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/list-uploads')
            .then(response => response.json())
            .then(data => setFiles(data))
            .catch(error => console.error('Error fetching uploaded files:', error));
    }, [])

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

    const manualScan = () => {
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
    const clearFiles = () => {
        fetch('http://localhost:3001/clear-files')
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
                <Card elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Uploaded Files
                    </Typography>
                    <List>
                        {files.map(file => (
                            <ListItem key={file}>
                                {file}
                            </ListItem>
                        ))}
                    </List>
                </Card>
                <Box style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={manualScan}>Manual Scan</Button>
                </Box>
                <Box style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={clearFiles}>Clear Files</Button>
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
