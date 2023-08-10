import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Paper, Typography, Box, Icon } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function EmailScanDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        // TODO: Handle the email file processing logic here.
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.eml, .msg',  // Assuming .eml and .msg are the supported email file formats.
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
            </Paper>
        </Container>
    );
}

export default EmailScanDropzone;
