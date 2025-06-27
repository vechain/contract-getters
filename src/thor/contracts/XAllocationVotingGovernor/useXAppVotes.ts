import { getConfig } from '@config';
import { NETWORK_TYPE } from '@config/network';
import { XAllocationVotingGovernor__factory } from '@contracts';
import { getCallClauseQueryKey, useCallClause } from '@utils';
import { formatEther } from 'viem';
import { ThorClient } from '@vechain/sdk-network';

const contractAbi = XAllocationVotingGovernor__factory.abi;
const method = 'getAppVotes' as const;

/**
 *  Returns the query key for fetching the number of  votes for a given app in a roundId.
 * @param networkType  the network type
 * @param roundId  the roundId the get the votes for
 * @param appId  the xApp id (bytes32 hex string)
 */
export const getXAppVotesQueryKey = (
    networkType: NETWORK_TYPE,
    roundId: number | string,
    appId: string,
) =>
    getCallClauseQueryKey<typeof contractAbi>({
        address: getConfig(networkType).xAllocationVotingContractAddress,
        method,
        args: [BigInt(roundId || 0), appId as `0x${string}`],
    });

/**
 *  Hook to get the number of votes for a given app in a roundId
 *
 * @param thor - The ThorClient instance.
 * @param networkType network type
 * @param roundId  the roundId the get the votes for (number or string)
 * @param appId  the xApp id (bytes32 hex string)
 * @returns  the number of votes for a given roundId
 */
export const useXAppVotes = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    roundId?: number | string,
    appId?: string
) => {
    const contractAddress = getConfig(
        networkType,
    ).xAllocationVotingContractAddress;

    // X Allocation Voting Governor app votes result: [ 0n ]
    return useCallClause({
        thor,
        address: contractAddress,
        abi: contractAbi,
        method,
        args: [BigInt(roundId || 0), appId as `0x${string}`],
        queryOptions: {
            enabled: !!roundId && !!appId && !!networkType && !!thor,
            select: (res) => formatEther(res[0]),
        },
    });
};
