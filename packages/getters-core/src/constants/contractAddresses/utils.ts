import { ThorClient, MAINNET_URL, TESTNET_URL } from '@vechain/sdk-network';
import mainnetAddresses from './mainnet';
import testnetAddresses from './testnet';
import { ContractAddressesConfig } from './type';

export const getContractAddresses = (
    thor: ThorClient,
    overrideAddresses?: Partial<ContractAddressesConfig>,
) => {
    const nodeURL = thor.httpClient.baseURL;
    //TODO: Move to another constant file
    const testnetNodes = [
        'https://testnet.vechain.org',
        'https://vethor-node-test.vechaindev.com',
        'https://sync-testnet.veblocks.net',
        'https://testnet.vecha.in',
        TESTNET_URL,
    ];

    const mainnetNodes = [
        'https://mainnet.vechain.org',
        'https://vethor-node.vechain.com',
        'https://mainnet.veblocks.net',
        'https://mainnet.vecha.in',
        MAINNET_URL,
    ];

    if (testnetNodes.includes(nodeURL)) {
        return {
            ...testnetAddresses,
            ...overrideAddresses,
        };
    }

    if (mainnetNodes.includes(nodeURL)) {
        return {
            ...mainnetAddresses,
            ...overrideAddresses,
        };
    }

    throw new Error('Invalid network');
};
