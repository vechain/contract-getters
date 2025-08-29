import { getAppShares } from './index';

export async function testAllocationPool() {
    console.info('\n🏊 AllocationPool Contract Tests');
    console.info('─'.repeat(40));

    try {
        // Test getAppShares with sample data
        console.info('Testing getAppShares...');
        const testRoundId = '1';
        const testAppId = '0x0000000000000000000000000000000000000001';

        const shares = await getAppShares(testRoundId, testAppId);
        console.info(`✓ App shares for round ${testRoundId}:`);
        console.info(`  Share: ${shares[0]?.toString() || 'N/A'}`);
        console.info(`  Unallocated Share: ${shares[1]?.toString() || 'N/A'}`);
    } catch (error) {
        console.error(
            '❌ AllocationPool test error:',
            error instanceof Error ? error.message : String(error),
        );
    }
}
