import { ThorClient } from '@vechain/sdk-network';
import mainnetAddresses from './mainnet';
import testnetAddresses from './testnet';
import { ContractAddressesConfig } from './type';
import { MAINNET_URLS, TESTNET_URLS } from '../networkUrls';

export const getContractAddresses = (
    thor: ThorClient,
    overrideAddresses?: Partial<ContractAddressesConfig>,
) => {
    const nodeURL = thor.httpClient.baseURL;

    if (TESTNET_URLS.includes(nodeURL)) {
        return {
            ...testnetAddresses,
            ...overrideAddresses,
        };
    }

    if (MAINNET_URLS.includes(nodeURL)) {
        return {
            ...mainnetAddresses,
            ...overrideAddresses,
        };
    }

    throw new Error('Invalid network');
};
