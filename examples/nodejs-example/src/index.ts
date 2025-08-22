/* eslint-disable no-console */
import { ThorClient } from '@vechain/sdk-network';
import { getVot3Balance, VeChainClient } from '@vechain/getters-core';

const TESTNET_NODE = 'https://testnet.vechain.org';
const TEST_WALLET = '0x66E9709bc01B8c0AfC99a7dC513f501821306E85'; // Testnet VBD deployer
const CUSTOM_VOT3_ADDRESS = '0x6e8b4a88d37897fc11f6ba12c805695f1c41f40e';

async function demonstrateExistingThorClient() {
    console.info('\n1. Using existing ThorClient:');
    try {
        const thorClient = ThorClient.at(TESTNET_NODE);
        const client = VeChainClient.from(thorClient);
        const balance = await getVot3Balance(client, TEST_WALLET);
        console.info('✓ VOT3 Balance:', balance.toString());
        console.info(
            '✓ Using contract:',
            client.contractAddresses.vot3ContractAddress,
        );
    } catch (error) {
        console.error(
            '✗ Error:',
            error instanceof Error ? error.message : 'Unknown error',
        );
    }
}

async function demonstrateDirectVeChainClient() {
    console.info('\n2. Using VeChainClient directly:');
    try {
        const client = VeChainClient.create({ nodeUrl: TESTNET_NODE });
        const balance = await getVot3Balance(client, TEST_WALLET);
        console.info('✓ VOT3 Balance:', balance.toString());
        console.info(
            '✓ Using contract:',
            client.contractAddresses.vot3ContractAddress,
        );
    } catch (error) {
        console.error(
            '✗ Error:',
            error instanceof Error ? error.message : 'Unknown error',
        );
    }
}

async function demonstrateCustomContractAddresses() {
    console.info('\n3. Using custom contract addresses:');
    try {
        const client = VeChainClient.create({
            nodeUrl: TESTNET_NODE,
            overrideAddresses: {
                vot3ContractAddress: CUSTOM_VOT3_ADDRESS,
            },
        });
        const balance = await getVot3Balance(client, TEST_WALLET);
        console.info('✓ VOT3 Balance:', balance.toString());
        console.info(
            '✓ Using contract:',
            client.contractAddresses.vot3ContractAddress,
        );
    } catch (error) {
        console.error(
            '✗ Error:',
            error instanceof Error ? error.message : 'Unknown error',
        );
    }
}

async function main() {
    console.info('🔗 VeChain Getters Examples');
    console.info('=======================');

    try {
        await demonstrateExistingThorClient();
        await demonstrateDirectVeChainClient();
        await demonstrateCustomContractAddresses();

        console.info('\n✨ All examples completed successfully!\n');
    } catch (error) {
        console.error(
            '\n❌ Fatal error:',
            error instanceof Error ? error.message : 'Unknown error',
        );
        process.exit(1);
    }
}

main();
