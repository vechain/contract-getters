import { XAllocationPool__factory } from '@vechain/vechain-contract-types/factories/@vechain/vebetterdao-contracts/dist/esm/artifacts/contracts/XAllocationPool__factory';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

export type AppShares = {
    app: string;
    share: number;
    unallocatedShare: number;
};

/**
 * Get app shares from XAllocationPool contract
 * @param roundId - The round ID
 * @param appId - The app ID
 * @param options - Optional client and network configuration
 * @returns Promise<{ share: string; unallocatedShare: string }> - The app shares
 */
export const getAppShares = async (
    roundId: string,
    appId: string,
    options?: GetterOptions,
) => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    return await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.xAllocationPoolContractAddress,
            XAllocationPool__factory.abi,
        )
        .read.getAppShares(BigInt(roundId), appId as `0x${string}`);
};
