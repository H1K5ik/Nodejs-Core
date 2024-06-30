const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const fileDirectory = './files'; 

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end('Method Not Allowed');
        return;
    }

    const fileName = path.join(fileDirectory, req.url);

    fs.stat(fileName, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('File Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
            return;
        }

        if (!stats.isFile()) {
            res.statusCode = 400;
            res.end('Requested resource is not a file');
            return;
        }

        const fileStream = fs.createReadStream(fileName);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${path.basename(fileName)}"`);

        fileStream.pipe(res);

        fileStream.on('error', (error) => {
            console.error('Error reading file:', error);
            res.statusCode = 500;
            res.end('Error reading file');
        });

        res.on('finish', () => {
            fileStream.close();
        });
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});