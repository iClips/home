
const fs = require('fs');
const path = require('path');
const { dialog } = require('electron'); // Use Electron for file dialogs

// Function to select a directory and process files
async function selectDirectoryAndRenameFiles() {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });

    if (result.canceled) {
        console.log('No directory selected.');
        return;
    }

    const directoryPath = result.filePaths[0];
    const fileArray = [];

    // Function to read files recursively
    function readFilesRecursively(dir) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                readFilesRecursively(fullPath); // Recursive call
            } else {
                fileArray.push(fullPath); // Add file path to array
            }
        }
    }

    readFilesRecursively(directoryPath);

    // Rename files
    fileArray.forEach(filePath => {
        const fileName = path.basename(filePath);
        const newFileName = generateRandomName(fileName);
        const newFilePath = path.join(path.dirname(filePath), newFileName);

        fs.renameSync(filePath, newFilePath); // Rename the file
        console.log(`Renamed: ${fileName} to ${newFileName}`);
    });
}

// Function to generate a random name by substituting numbers and special characters
function generateRandomName(fileName) {
    return fileName.replace(/[0-9!@#$%^&*(),.?":{}|<>]/g, () => {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
        return randomLetter; // Substitute with random letter
    });
}

// Run the function
selectDirectoryAndRenameFiles().catch(console.error);
