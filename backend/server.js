const express = require('express');
const multer = require('multer');
const NodeClam = require('clamscan');
const app = express();
const port = 3001;

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

const options = {
    clamdscan: {
        socket: null,  // Ensure no socket is used
        host: 'clamav', // Use the service name as defined in docker-compose.yml as the hostname
        port: 3310, // TCP port exposed by the ClamAV container
        timeout: 300000, 
        localFallback: false, 
        path: '/bin/clamdscan', 
        configFile: null, 
        multiscan: false, 
        reloadDb: true, 
        active: true,
        bypassTest: false,
    },
};

const ClamScan = new NodeClam().init(options);

app.post('/scan', upload.single('emailFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'No file uploaded.' });
        }

        const clamscan = await ClamScan;

        const { isInfected, file, viruses } = await clamscan.scanBuffer(req.file.buffer);

        if (isInfected) {
            res.status(400).json({ 
                status: 'infected', 
                message: `The file ${file.originalname} is infected with ${viruses}!` 
            });
        } else {
            res.status(200).json({ 
                status: 'clean', 
                message: `The file ${file.originalname} is clean.` 
            });
        }

    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            message: `An error occurred during the scan: ${err.message}` 
        });
    }
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
