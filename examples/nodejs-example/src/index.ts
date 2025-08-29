import { getVot3Balance, VeChainClient } from '@vechain/getters-core';
import { ThorClient } from '@vechain/sdk-network';

const TESTNET_NODE: string = 'https://testnet.vechain.org';
const TEST_ADDRESS = '0x66E9709bc01B8c0AfC99a7dC513f501821306E85';
const CUSTOM_VOT3_ADDRESS = '0x6e8b4a88d37897fc11f6ba12c805695f1c41f40e';

/**
 * Example 1: Using default configuration (no client or network provided)
 * This uses the built-in default network URL from the getters library
 */
async function withDefaults() {
    console.info('\n1. Using default configuration');
    console.info('─'.repeat(35));

    const balance = await getVot3Balance(TEST_ADDRESS);
    console.info(`VOT3 Balance: ${balance.toString()}`);
    console.info('✓ Used default network and contract addresses');
}

/**
 * Example 2: Using an existing ThorClient
 * Convert your existing ThorClient to a VeChainClient
 */
async function withExistingThorClient() {
    console.info('\n2. Using existing ThorClient');
    console.info('─'.repeat(35));

    const thorClient = ThorClient.at(TESTNET_NODE);
    const veChainClient = VeChainClient.from(thorClient);

    const balance = await getVot3Balance(TEST_ADDRESS, {
        client: veChainClient,
    });

    console.info(`VOT3 Balance: ${balance.toString()}`);
    console.info(
        `Contract: ${veChainClient.contractAddresses.vot3ContractAddress}`,
    );
    console.info('✓ Converted existing ThorClient to VeChainClient');
}

/**
 * Example 3: Creating VeChainClient directly
 * Use VeChainClient.create() with a custom network URL
 */
async function withDirectVeChainClient() {
    console.info('\n3. Creating VeChainClient directly');
    console.info('─'.repeat(35));

    const balance = await getVot3Balance(TEST_ADDRESS, {
        networkUrl: TESTNET_NODE,
    });

    console.info(`VOT3 Balance: ${balance.toString()}`);
    console.info(`Network: ${TESTNET_NODE}`);
    console.info('✓ Created VeChainClient with custom network URL');
}

/**
 * Example 4: Using custom contract addresses
 * Override default contract addresses for testing or custom deployments
 */
async function withCustomContractAddresses() {
    console.info('\n4. Using custom contract addresses');
    console.info('─'.repeat(35));

    const customClient = VeChainClient.create({
        nodeUrl: TESTNET_NODE,
        overrideAddresses: {
            vot3ContractAddress: CUSTOM_VOT3_ADDRESS,
        },
    });

    const balance = await getVot3Balance(TEST_ADDRESS, {
        client: customClient,
    });

    console.info(`VOT3 Balance: ${balance.toString()}`);
    console.info(
        `Custom contract: ${customClient.contractAddresses.vot3ContractAddress}`,
    );
    console.info('✓ Used custom contract address override');
}

async function main() {
    console.info('🔗 (VOT3) - Contract Getters Examples');
    console.info('═'.repeat(40));

    try {
        await withDefaults();
        await withExistingThorClient();
        await withDirectVeChainClient();
        await withCustomContractAddresses();

        console.info('\n✨ All examples completed successfully!');
    } catch (error) {
        console.error(
            '\n❌ Error:',
            error instanceof Error ? error.message : String(error),
        );
        process.exit(1);
    }
}

main();
