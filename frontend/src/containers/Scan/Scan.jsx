import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Paper, Typography, Box, Icon, Snackbar, Button, Card, CardContent, List, ListItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';

function EmailScanDropzone() {
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState('info');
    const [files, setFiles] = useState([]);
    const [scanResults, setScanResults] = useState([]);


    const updateFiles = async () => {
        try {
            const response = await fetch('http://localhost:3001/list-uploads');
            const data = await response.json();
            if (Array.isArray(data.files)) {
                setFiles(data.files);
            } else {
                console.warn("Received unexpected data format from server:", data);
                setFiles([]);
            }
        } catch (error) {
            console.error("Error fetching files:", error);
            setFiles([]);
        }
    };

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
        updateFiles()
    }, []);

    const manualScan = () => {
        fetch('http://localhost:3001/test')
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
                setSeverity('info');
                setScanResults(data);
            })
            .catch(error => {
                setMessage('Failed to connect to backend.');
                setSeverity('error');
            });
    };
    const clearFiles = () => {
        fetch('http://localhost:3001/clear-files')
        setFiles([])
        setScanResults([]);
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
                <Card elevation={3} style={{ marginTop: '20px' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Scan Results
                        </Typography>
                        <List>
                            {scanResults.map(result => (
                                <ListItem key={result.file}>
                                    <Typography variant="body1">
                                        File: {result.file} -
                                        Status: {result.isInfected ? 'Infected' : 'Clean'} {result.isInfected ? `(Viruses: ${result.viruses.join(', ')})` : ''}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
                <Box style={{ marginTop: '20px' }}>
                    <Button variant="contained" onClick={manualScan} style={{ marginRight: '10px' }}>Manual Scan</Button>
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
