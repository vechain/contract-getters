#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '../temp-abis');

function log(message) {
    console.log(`🧹 ${message}`);
}

function main() {
    try {
        log('Cleaning up temporary ABI files...');

        if (fs.existsSync(TEMP_DIR)) {
            fs.rmSync(TEMP_DIR, { recursive: true, force: true });
            log('✅ Temporary directory removed successfully');
        } else {
            log('ℹ️  No temporary directory found to clean up');
        }
    } catch (error) {
        console.error('❌ Error during cleanup:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { main };
