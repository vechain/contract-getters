import { B3TR__factory } from '@vechain/vebetterdao-contracts';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

/**
 * Get B3TR token balance for a given address
 * @param address - The address to check balance for
 * @param options - Optional client and network configuration
 * @returns Promise<string> - The balance as a string
 */
export const getB3trBalance = async (
    address: string,
    options?: GetterOptions,
) => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    return await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.b3trContractAddress,
            B3TR__factory.abi,
        )
        .read.balanceOf(address);
};
