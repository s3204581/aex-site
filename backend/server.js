const express = require('express');
const fs = require('fs')
const multer = require('multer');
const NodeClam = require('clamscan');
const cors = require('cors'); 
const app = express();
const port = 3001;

app.use(cors()); 

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/uploads') // specify the directory to save
    },
    filename: function (req, file, cb) {
        if (file && file.originalname) {
            cb(null, file.originalname);
        } else {
            cb(new Error('File is missing!'), null);
        }
    }
});
const upload = multer({ storage: storage });

const options = {
    clamdscan: {
        socket: null,  
        host: 'clamav', // Use the service name as defined in docker-compose.yml as the hostname
        port: 3310, // TCP port exposed by the ClamAV container
        timeout: 300000, 
        localFallback: false, 
        path: '/usr/bin/clamdscan', 
        configFile: '/etc/clamav/clamd.conf', 
        multiscan: false, 
        reloadDb: true, 
        active: true,
        bypassTest: false,
    },
};

let clamscan

const ClamScan = new NodeClam().init(options);

 

ClamScan.then(async cs => {
    try {
        clamscan = cs;
        const version = await clamscan.getVersion();
        console.log(`ClamAV Version: ${version}`);

    } catch (err) {
        console.error(`Error initializing ClamScan: ${err.message}`);
    }
}).catch(err => {
    console.error(`Error initializing NodeClam: ${err.message}`);
});


app.post('/scan', upload.single('emailFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'No file uploaded.' });
        }
        console.log(req.file)
        let file_path = req.file.path
        // Now scan using the path
        const { isInfected, file, viruses } = await clamscan.isInfected(file_path);

        // After scanning, you can delete the file if it's not needed
        // fs.unlink(req.file.path, err => {
        //     if(err) console.error('Error deleting file:', err);
        // });

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


app.get('/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
});



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
