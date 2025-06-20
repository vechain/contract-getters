import { XAllocationVoting__factory } from '@/contracts';
import { getConfig } from '@config';
import { NETWORK_TYPE } from '@config/network';
import { getCallClauseQueryKey, useCallClause } from '@utils';

const abi = XAllocationVoting__factory.abi;
const method = 'currentRoundId' as const;

export const getCurrentAllocationsRoundIdQueryKey = (network: NETWORK_TYPE) =>
    getCallClauseQueryKey<typeof abi>({
        method,
        address: getConfig(network).xAllocationVotingContractAddress,
        args: [],
    });

/**
 * Hook to get the current roundId of allocations voting
 * @returns  the current roundId of allocations voting
 */
export const useCurrentAllocationsRoundId = (networkType: NETWORK_TYPE) => {
    // X Allocation Voting current round ID result: [ 47n ]
    return useCallClause({
        abi,
        address: getConfig(networkType).xAllocationVotingContractAddress,
        method,
        args: [],
        queryOptions: {
            enabled: !!networkType,
            select: (data) => data[0].toString(),
        },
    });
};
