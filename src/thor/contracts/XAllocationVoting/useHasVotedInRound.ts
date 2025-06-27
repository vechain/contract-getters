import { getConfig } from '@config';
import { NETWORK_TYPE } from '@config/network';
import { XAllocationVoting__factory } from '@contracts';
import { getCallClauseQueryKey, useCallClause } from '@utils';
import { ThorClient } from '@vechain/sdk-network';

const method = 'hasVoted' as const;
const abi = XAllocationVoting__factory.abi;

export const getHasVotedInRoundQueryKey = (
    roundId: string,
    address: string,
    networkType: NETWORK_TYPE,
) =>
    getCallClauseQueryKey<typeof abi>({
        address: getConfig(networkType).xAllocationVotingContractAddress,
        method,
        args: [BigInt(roundId || 0), address as `0x${string}`],
    });

/**
 *  Hook to get if a user has voted in a given roundId
 * @param thor - The ThorClient instance.
 * @param networkType network type
 * @param roundId  the roundId the get the votes for
 * @param address  the address to check if they have voted
 * @returns  if a user has voted in a given roundId
 */
export const useHasVotedInRound = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    roundId?: string,
    address?: string
) => {
    return useCallClause({
        thor,
        abi,
        address: getConfig(networkType).xAllocationVotingContractAddress,
        method,
        args: [BigInt(roundId || 0), address as `0x${string}`],
        queryOptions: {
            enabled: !!roundId && !!address && !!thor,
            select: (data) => data[0],
        },
    });
};
