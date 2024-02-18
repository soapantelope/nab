const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;
const multer  = require('multer');

const app = express();
const upload = multer();

async function processVideo(inputFilePath, outputFilePath) {
    // Execute Swift binary to generate the USDZ file
    const swiftCommand = `./HelloPhotogrammetry ${inputFilePath} ${outputFilePath} -d raw -o sequential -f normal`;
    await executeCommand(swiftCommand);
}

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                reject(error);
            } else {
                console.log(`Command output: ${stdout}`);
                resolve();
            }
        });
    });
}

app.post('/process-images', upload.single('images'), async (req, res) => {
    try {
        // Save the uploaded images to a temporary file
        const tempFilePath = 'temp-images.zip'; // Or use a unique filename
        await fs.writeFile(tempFilePath, req.file.buffer);

        // Process the images
        await processVideo(tempFilePath, 'output.usdz');

        // Respond with success
        res.status(200).send('Images processed successfully');
    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).send('Error processing images');
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
