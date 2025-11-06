import { VOT3__factory } from '@vechain/vechain-contract-types';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

export type CustomTokenInfo = {
    name: string;
    address: string;
    decimals: string;
    symbol: string;
};

/**
 * Get ERC20 token info (name, symbol, decimals)
 * @param tokenAddress - The token contract address
 * @param options - Optional client and network configuration
 * @returns Promise<CustomTokenInfo> - Token information
 */
export const getTokenInfo = async (
    tokenAddress: string,
    options?: GetterOptions,
): Promise<CustomTokenInfo> => {
    if (!tokenAddress) throw new Error('Token address is required');

    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    const contract = enhancedClient.contracts.load(
        tokenAddress,
        VOT3__factory.abi,
    );

    const [nameResult, symbolResult, decimalsResult] = await Promise.all([
        contract.read.name(),
        contract.read.symbol(),
        contract.read.decimals(),
    ]);

    return {
        name: nameResult[0] as string,
        address: tokenAddress,
        decimals: decimalsResult.toString(),
        symbol: symbolResult[0] as string,
    };
};
