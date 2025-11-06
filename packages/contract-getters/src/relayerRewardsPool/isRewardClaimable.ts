import { RelayerRewardsPool__factory } from '@vechain/vechain-contract-types';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

/**
 * Check if a reward is claimable for a given address
 * @param tokenAddress - The token contract address
 * @param roundId - The round ID to check reward claimability for
 * @param options - Optional client and network configuration
 * @returns Promise<boolean> - Whether the reward is claimable
 */
export const isRewardClaimable = async (
    roundId: string,
    options?: GetterOptions,
): Promise<boolean> => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    const result = await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.relayerRewardsPoolContractAddress,
            RelayerRewardsPool__factory.abi,
        )
        .read.isRewardClaimable(BigInt(roundId));

    return result[0];
};
