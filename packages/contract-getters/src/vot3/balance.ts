import { VOT3__factory } from '@vechain/vechain-contract-types';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

/**
 * Get VOT3 token balance for a given address
 * @param address - The address to check balance for
 * @param options - Optional client and network configuration
 * @returns Promise<string> - The balance as a string
 */
export const getVot3Balance = async (
    address: string,
    options?: GetterOptions,
) => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    return await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.vot3ContractAddress,
            VOT3__factory.abi,
        )
        .read.balanceOf(address);
};
