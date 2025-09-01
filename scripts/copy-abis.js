#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '../temp-abis');

function log(message) {
    console.log(`📋 ${message}`);
}

function main() {
    try {
        log('Copying ABI files from b32 package...');

        // Check if b32 is installed
        const b32AbiDir = path.join(__dirname, '../node_modules/b32/ABIs');
        if (!fs.existsSync(b32AbiDir)) {
            throw new Error('b32 package not found. Run "yarn add:b32" first.');
        }

        // Create temp directory
        if (fs.existsSync(TEMP_DIR)) {
            fs.rmSync(TEMP_DIR, { recursive: true, force: true });
        }
        fs.mkdirSync(TEMP_DIR, { recursive: true });

        // Copy all ABI files
        const abiFiles = fs
            .readdirSync(b32AbiDir)
            .filter((file) => file.endsWith('.json'));

        abiFiles.forEach((file) => {
            const sourcePath = path.join(b32AbiDir, file);
            const targetPath = path.join(TEMP_DIR, file);
            fs.copyFileSync(sourcePath, targetPath);
        });

        log(
            `✅ Successfully copied ${abiFiles.length} ABI files to temp directory`,
        );
    } catch (error) {
        console.error('❌ Error copying ABIs:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { main };
