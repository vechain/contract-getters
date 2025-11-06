import { XAllocationVoting__factory } from '@vechain/vechain-contract-types';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

/**
 * Get the current round ID from XAllocationVoting contract
 * @param options - Optional client and network configuration
 * @returns Promise<string> - The current round ID as a string
 */
export const getCurrentRoundId = async (options?: GetterOptions) => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    return await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.xAllocationVotingContractAddress,
            XAllocationVoting__factory.abi,
        )
        .read.currentRoundId();
};
