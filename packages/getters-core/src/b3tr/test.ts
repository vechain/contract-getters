import { getB3trBalance } from './index';

const TEST_ADDRESS = '0x66E9709bc01B8c0AfC99a7dC513f501821306E85';

export async function testB3tr() {
    console.info('\n🪙 B3TR Contract Tests');
    console.info('─'.repeat(40));

    try {
        // Test getB3trBalance
        console.info('Testing getB3trBalance...');
        const balance = await getB3trBalance(TEST_ADDRESS);
        console.info(
            `✓ B3TR Balance for ${TEST_ADDRESS}: ${balance.toString()}`,
        );
    } catch (error) {
        console.error(
            '❌ B3TR test error:',
            error instanceof Error ? error.message : String(error),
        );
    }
}
