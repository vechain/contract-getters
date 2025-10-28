import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

/**
 * Check if a reward is claimable for a given address
 * @param tokenAddress - The token contract address
 * @param address - The address to check reward claimability for
 * @param options - Optional client and network configuration
 * @returns Promise<boolean> - Whether the reward is claimable
 */
export const isRewardClaimable = async (
    address: string,
    options?: GetterOptions,
): Promise<boolean> => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    const result: readonly [boolean, string] = await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.relayerRewardsPoolContractAddress,
            RelayerRewardsPool__factory.abi,
        )
        .read.isRewardClaimable(address);

    return result[0];
};
