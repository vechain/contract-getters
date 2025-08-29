import { getErc20Balance, getTokenInfo } from './index';

const TEST_ADDRESS = '0x66E9709bc01B8c0AfC99a7dC513f501821306E85';
// Using B3TR token address as test ERC20 token
const B3TR_TOKEN_ADDRESS = '0xbf64cf86894Ee0877C4e7d03936e35Ee8D8b864F'; // Testnet B3TR

export async function testErc20() {
    console.info('\n🎯 ERC20 Contract Tests');
    console.info('─'.repeat(40));

    try {
        // Test getTokenInfo
        console.info('Testing getTokenInfo...');
        const tokenInfo = await getTokenInfo(B3TR_TOKEN_ADDRESS);
        console.info(`✓ Token Info for ${B3TR_TOKEN_ADDRESS}:`);
        console.info(`  Name: ${tokenInfo.name}`);
        console.info(`  Symbol: ${tokenInfo.symbol}`);
        console.info(`  Decimals: ${tokenInfo.decimals}`);

        // Test getErc20Balance
        console.info('Testing getErc20Balance...');
        const balance = await getErc20Balance(B3TR_TOKEN_ADDRESS, TEST_ADDRESS);
        console.info(
            `✓ ERC20 Balance for ${TEST_ADDRESS}: ${balance.toString()}`,
        );
    } catch (error) {
        console.error(
            '❌ ERC20 test error:',
            error instanceof Error ? error.message : String(error),
        );
    }
}
