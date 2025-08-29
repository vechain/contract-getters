import { getTokenUsdPrice, PRICE_FEED_IDS, type SupportedToken } from './index';

export async function testOracle() {
    console.info('\n🔮 Oracle Contract Tests');
    console.info('─'.repeat(40));

    try {
        // Test getTokenUsdPrice for different tokens
        const tokensToTest: SupportedToken[] = ['B3TR', 'VET', 'VTHO'];

        for (const token of tokensToTest) {
            console.info(`Testing getTokenUsdPrice for ${token}...`);
            const price = await getTokenUsdPrice(token);
            console.info(
                `✓ ${token} USD Price: ${price[0]?.toString() || 'N/A'}`,
            );
        }

        console.info('\n📋 Available Price Feed IDs:');
        Object.entries(PRICE_FEED_IDS).forEach(([token, id]) => {
            console.info(`  ${token}: ${id}`);
        });
    } catch (error) {
        console.error(
            '❌ Oracle test error:',
            error instanceof Error ? error.message : String(error),
        );
    }
}
