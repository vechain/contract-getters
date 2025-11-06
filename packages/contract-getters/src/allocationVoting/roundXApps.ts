import { XAllocationVoting__factory } from '@vechain/vechain-contract-types';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

export type XApp = {
    id: string;
    teamWalletAddress: string;
    name: string;
    metadataURI: string;
    createdAtTimestamp: string;
};

/**
 * Get apps of a specific round from XAllocationVoting contract
 * @param roundId - The round ID to get apps for
 * @param options - Optional client and network configuration
 * @returns Promise<XApp[]> - Array of apps in the round
 */
export const getRoundXApps = async (
    roundId: string,
    options?: GetterOptions,
): Promise<XApp[]> => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    const result = await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.xAllocationVotingContractAddress,
            XAllocationVoting__factory.abi,
        )
        .read.getAppsOfRound(BigInt(roundId));

    return result[0].map((app) => ({
        id: app.id.toString(),
        teamWalletAddress: app.teamWalletAddress,
        name: app.name,
        metadataURI: app.metadataURI,
        createdAtTimestamp: app.createdAtTimestamp.toString(),
    }));
};
