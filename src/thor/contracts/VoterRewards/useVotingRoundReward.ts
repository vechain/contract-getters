import { VoterRewards__factory } from '@contracts';
import { formatEther } from 'viem';
import { useCallClause } from '@utils';
import { getConfig } from '@config';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from '@vechain/sdk-network';

/**
 * Generates a query key for the getRoundReward query.
 *
 * @param {string} roundId - The id of the round.
 * @param {string} address - The address of the voter.
 * @returns {Array<string>} An array of strings that forms the query key.
 */
export const getRoundRewardQueryKey = (roundId?: string, address?: string) => [
    'VECHAIN_KIT',
    'roundReward',
    roundId,
    'voter',
    address,
];

/**
 * useRoundReward is a custom hook that fetches the reward for a given round and voter.
 *
 * @param {ThorClient} thor - The ThorClient instance.
 * @param {NETWORK_TYPE} networkType - network type
 * @param {string} address - The address of the voter.
 * @param {string} roundId - The id of the round.
 * @returns {object} An object containing the status and data of the query. Refer to the react-query documentation for more details.
 */
export const useRoundReward = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    address: string,
    roundId: string
) => {
    // Voter Rewards getReward result type: [ 0n ]
    return useCallClause({
        thor,
        address: getConfig(networkType).voterRewardsContractAddress,
        abi: VoterRewards__factory.abi,
        method: 'getReward',
        args: [BigInt(roundId || 0), address as `0x${string}`],
        queryOptions: {
            enabled: !!address && !!roundId && !!networkType && !!thor,
            select: (data) => ({
                roundId,
                rewards: formatEther(data[0]),
            }),
        },
    });
};
