import { IVechainEnergyOracleV1__factory } from '@vechain/vebetterdao-contracts';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

// Create an enum or object for supported price feed IDs
export const PRICE_FEED_IDS = {
    B3TR: '0x623374722d757364000000000000000000000000000000000000000000000000',
    VET: '0x7665742d75736400000000000000000000000000000000000000000000000000',
    VTHO: '0x7674686f2d757364000000000000000000000000000000000000000000000000',
    GBP: '0x6762702d75736400000000000000000000000000000000000000000000000000',
    EUR: '0x657572742d757364000000000000000000000000000000000000000000000000',
} as const;

export type SupportedToken = keyof typeof PRICE_FEED_IDS;

/**
 * Get USD price for a supported token from the oracle contract
 * @param token - The token to get price for
 * @param options - Optional client and network configuration
 * @returns Promise<string> - The price as a string
 */
export const getTokenUsdPrice = async (
    token: SupportedToken,
    options?: GetterOptions,
) => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    return await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.oracleContractAddress,
            IVechainEnergyOracleV1__factory.abi,
        )
        .read.getLatestValue(PRICE_FEED_IDS[token]);
};
