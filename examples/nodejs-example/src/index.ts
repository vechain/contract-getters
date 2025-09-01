import {
    getAppShares,
    getAvatar,
    getB3trBalance,
    getCurrentRoundId,
    getErc20Balance,
    getIsPerson,
    getRoundXApps,
    getTokenInfo,
    getVot3Balance,
} from '@vechain/getters-core';

const WALLET_ADDRESS = '0x66E9709bc01B8c0AfC99a7dC513f501821306E85';
const B3TR_TOKEN_ADDRESS = '0x5ef79995FE8a89e0812330E4378eB2660ceDe699'; //Mainnet B3TR
const ROUND_ID = '50';
const APP_ID =
    '0x2fc30c2ad41a2994061efaf218f1d52dc92bc4a31a0f02a4916490076a7a393a'; //Mugshot

async function runVot3Example() {
    console.info('\n🗳️  VOT3 Contract Usage');
    console.info('─'.repeat(40));

    console.info(`Getting VOT3 balance for ${WALLET_ADDRESS}...`);
    const balance = await getVot3Balance(WALLET_ADDRESS);
    console.info(`VOT3 Balance: ${balance.toString()}`);
}

async function runB3trExample() {
    console.info('\n🪙 B3TR Contract Usage');
    console.info('─'.repeat(40));

    console.info(`Getting B3TR balance for ${WALLET_ADDRESS}...`);
    const balance = await getB3trBalance(WALLET_ADDRESS);
    console.info(`B3TR Balance: ${balance.toString()}`);
}

async function runAllocationVotingExample() {
    console.info('\n🗳️  AllocationVoting Contract Usage');
    console.info('─'.repeat(40));

    console.info('Getting current round ID...');
    const currentRound = await getCurrentRoundId();
    console.info(`Current Round ID: ${currentRound.toString()}`);

    console.info('Getting apps for current round...');
    const apps = await getRoundXApps(currentRound.toString());
    console.info(`Apps in round ${currentRound}: ${apps.length} apps found`);

    if (apps.length > 0) {
        console.info(`First app: ${apps[0].name} (ID: ${apps[0].id})`);
        console.info(`Team wallet: ${apps[0].teamWalletAddress}`);
    }
}

async function runAllocationPoolExample() {
    console.info('\n🏊 AllocationPool Contract Usage');
    console.info('─'.repeat(40));

    console.info(`Getting app shares for round ${ROUND_ID}...`);
    const shares = await getAppShares(ROUND_ID, APP_ID);
    console.info(`App shares for round ${ROUND_ID}:`);
    console.info(`  Share: ${shares[0]?.toString() || 'N/A'}`);
    console.info(`  Unallocated Share: ${shares[1]?.toString() || 'N/A'}`);
}

async function runErc20Example() {
    console.info('\n🎯 ERC20 Contract Usage');
    console.info('─'.repeat(40));

    console.info(`Getting token info for ${B3TR_TOKEN_ADDRESS}...`);
    const tokenInfo = await getTokenInfo(B3TR_TOKEN_ADDRESS);
    console.info(`Token Name: ${tokenInfo.name}`);
    console.info(`Token Symbol: ${tokenInfo.symbol}`);
    console.info(`Token Decimals: ${tokenInfo.decimals}`);

    console.info(
        `Getting ${tokenInfo.symbol} balance for ${WALLET_ADDRESS}...`,
    );
    const balance = await getErc20Balance(B3TR_TOKEN_ADDRESS, WALLET_ADDRESS);
    console.info(`${tokenInfo.symbol} Balance: ${balance.toString()}`);
}

async function runVeBetterPassportExample() {
    console.info('\n🛂 VeBetterPassport Contract Usage');
    console.info('─'.repeat(40));

    console.info(`Checking if ${WALLET_ADDRESS} is a verified person...`);
    const isPerson = await getIsPerson(WALLET_ADDRESS);
    console.info(`Is person: ${isPerson ? 'Yes ✅' : 'No ❌'}`);
}

async function runVetDomainsExample() {
    console.info('\n🌐 VetDomains Example');
    console.info('─'.repeat(40));

    console.info(`Getting avatar for ${WALLET_ADDRESS}...`);
    const avatar = await getAvatar('root-staging-b3tr.veworld.vet', {
        networkUrl: 'https://testnet.vechain.org',
    });
    console.info(`Avatar: ${avatar}`);
}

async function main() {
    console.info('🔗 VeChain Contract Getters - All Examples');
    console.info('═'.repeat(50));

    try {
        await runVot3Example();
        await runB3trExample();
        await runAllocationVotingExample();
        await runAllocationPoolExample();
        await runErc20Example();
        await runVeBetterPassportExample();
        await runVetDomainsExample();

        console.info('\n✨ All contract examples completed successfully!');
    } catch (error) {
        console.error(
            '\n❌ Error:',
            error instanceof Error ? error.message : String(error),
        );
        process.exit(1);
    }
}

main();
