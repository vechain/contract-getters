#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '../temp-abis');

// VeBetterDAO contract ABIs we want to include
const VEBETTERDAO_CONTRACTS = [
    'VeBetterDAO-b3tr.json',
    'VeBetterDAO-vot3.json',
    'VeBetterDAO-ve-better-passport.json',
    'VeBetterDAO-x-allocation-pool.json',
    'VeBetterDAO-x-allocations-voting.json',
    'VeBetterDAO-emissions.json',
    'VeBetterDAO-voter-rewards.json',
    'VeBetterDAO-galaxy-member.json',
    'VeBetterDAO-treasury.json',
    'VeBetterDAO-timelock.json',
    'VeBetterDAO-b3tr-governor.json',
    'VeBetterDAO-node-management.json',
    'VeBetterDAO-x-2-earn-apps.json',
    'VeBetterDAO-x-2-earn-creator.json',
    'VeBetterDAO-x-2-earn-rewards-pool.json',
];

// Additional contracts we need
const ADDITIONAL_CONTRACTS = [
    { source: 'oracle.vechain.energy.json', target: 'Oracle.json' },
    { source: 'vip180-mintable.json', target: 'ERC20.json' },
];

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

        // Copy VeBetterDAO contracts
        let copiedCount = 0;
        VEBETTERDAO_CONTRACTS.forEach((contractFile) => {
            const sourcePath = path.join(b32AbiDir, contractFile);
            const targetPath = path.join(TEMP_DIR, contractFile);

            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, targetPath);
                copiedCount++;
            } else {
                console.warn(`⚠️  Warning: ${contractFile} not found`);
            }
        });

        // Copy additional contracts with rename
        ADDITIONAL_CONTRACTS.forEach(({ source, target }) => {
            const sourcePath = path.join(b32AbiDir, source);
            const targetPath = path.join(TEMP_DIR, target);

            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, targetPath);
                copiedCount++;
            } else {
                console.warn(`⚠️  Warning: ${source} not found`);
            }
        });

        log(
            `✅ Successfully copied ${copiedCount} ABI files to temp directory`,
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
