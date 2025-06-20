import { getConfig } from '@/config';
import { XAllocationVoting__factory } from '@contracts';
import { NETWORK_TYPE } from '@/config/network';
import { getCallClauseQueryKey, useCallClause } from '@utils';

export const RoundState = {
    0: 'Active',
    1: 'Failed',
    2: 'Succeeded',
} as const;

const abi = XAllocationVoting__factory.abi;
const method = 'state' as const;

export const getAllocationsRoundStateQueryKey = (
    roundId: string,
    network: NETWORK_TYPE,
) =>
    getCallClauseQueryKey<typeof abi>({
        method,
        address: getConfig(network).xAllocationVotingContractAddress,
        args: [BigInt(roundId || 0)],
    });

/**
 * Hook to get the state of a given roundId
 * @param networkType network type
 * @param roundId the roundId to get state for
 * @returns the state of a given roundId
 */
export const useAllocationsRoundState = (
    networkType: NETWORK_TYPE,
    roundId?: string
) => {
    // X Allocation Voting round state result: [ 2 ]
    return useCallClause({
        abi,
        address: getConfig(networkType).xAllocationVotingContractAddress,
        method,
        args: [BigInt(roundId || 0)],
        queryOptions: {
            enabled: !!roundId && !!networkType,
            select: (data) => data[0] as keyof typeof RoundState,
        },
    });
};
