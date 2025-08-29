import { getIsPerson } from './index';

const TEST_ADDRESS = '0x66E9709bc01B8c0AfC99a7dC513f501821306E85';

export async function testVeBetterPassport() {
    console.info('\n🛂 VeBetterPassport Contract Tests');
    console.info('─'.repeat(40));

    try {
        // Test getIsPerson
        console.info('Testing getIsPerson...');
        const isPerson = await getIsPerson(TEST_ADDRESS);
        console.info(
            `✓ Is ${TEST_ADDRESS} a person: ${isPerson[0] ? 'Yes' : 'No'}`,
        );
    } catch (error) {
        console.error(
            '❌ VeBetterPassport test error:',
            error instanceof Error ? error.message : String(error),
        );
    }
}
