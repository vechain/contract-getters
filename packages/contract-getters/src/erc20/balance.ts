import { VOT3__factory } from '@vechain/vechain-contract-types';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

/**
 * Get ERC20 token balance for a given address
 * @param tokenAddress - The token contract address
 * @param address - The address to check balance for
 * @param options - Optional client and network configuration
 * @returns Promise<string> - The balance as a string
 */
export const getErc20Balance = async (
    tokenAddress: string,
    address: string,
    options?: GetterOptions,
) => {
    if (!tokenAddress || !address) {
        throw new Error('Token address and user address are required');
    }

    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    return await enhancedClient.contracts
        .load(tokenAddress, VOT3__factory.abi)
        .read.balanceOf(address);
};
