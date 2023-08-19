const express = require('express');
const fs = require('fs')
const path = require('path');
const multer = require('multer');
const NodeClam = require('clamscan');
const cors = require('cors'); 
const { clear } = require('console');
const app = express();
const port = 3001;
const UPLOADS_DIR = '/app/uploads'

app.use(cors()); 

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/app/uploads') // specify the directory to save
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

const clearUploadsDirectory = (directory) => {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
}


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

app.get('/list-uploads', (req, res) => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        res.json(files);
    });
});

app.get('/clear-files', (req, res) => {
    clearUploadsDirectory(UPLOADS_DIR)
});


app.post('/scan', upload.single('emailFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'No file uploaded.' });
        }
        
        if (fs.existsSync(req.file.path)) {
            // proceed with scanning
            const { isInfected, file, viruses } = await clamscan.isInfected(req.file.path);
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
        } else {
            console.log("fs.existsSync error")
        }
        
    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            message: `An error occurred during the scan: ${err.message}` 
        });
    }
});

app.get('/test', async (req, res) => {
    let results = [];
    try {
        const files = fs.readdirSync(UPLOADS_DIR);

        for (const file of files) {
            let file_path = path.join(UPLOADS_DIR, file);
            const { isInfected, file: scannedFile, viruses } = await clamscan.isInfected(file_path);
            
            results.push({
                file: scannedFile,
                isInfected: isInfected,
                viruses: viruses
            });
        }
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error scanning files', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
