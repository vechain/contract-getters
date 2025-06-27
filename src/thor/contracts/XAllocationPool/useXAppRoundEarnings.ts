import { useQuery } from '@tanstack/react-query';
import { getConfig } from '@config';
import { NETWORK_TYPE } from '@config/network';
import { XAllocationPool__factory } from '@contracts';
import { getRoundXApps, getRoundXAppsQueryKey } from '@thor';
import { formatEther } from 'viem';
import { ThorClient } from '@vechain/sdk-network';
import { QueryClient } from '@tanstack/react-query';

type UseXAppRoundEarningsQueryResponse = {
    amount: string;
    appId: string;
};

/**
 *  Get the amount of $B3TR an xApp earned from an allocation round
 *
 * @param thor  the thor instance
 * @param roundId  the round id
 * @param xAppId  the xApp id
 * @param networkType  the network type
 * @returns (amount, appId) amount of $B3TR an xApp earned from an allocation round and the xApp id
 */
export const getXAppRoundEarnings = async (
    thor: ThorClient,
    roundId: string,
    xAppId: string,
    networkType: NETWORK_TYPE,
): Promise<UseXAppRoundEarningsQueryResponse> => {
    const res = await thor.contracts
        .load(
            getConfig(networkType).xAllocationPoolContractAddress,
            XAllocationPool__factory.abi,
        )
        .read.roundEarnings(roundId, xAppId);

    if (!res)
        throw new Error(
            `Failed to fetch xApp round earnings for ${xAppId} in round ${roundId}`,
        );

    return { amount: formatEther(BigInt(res[0] || 0)), appId: xAppId };
};

export const getXAppRoundEarningsQueryKey = (
    roundId: string | number,
    xAppId?: string,
) => [
    'VECHAIN_KIT',
    'roundEarnings',
    'roundId',
    Number(roundId),
    'appId',
    ...(xAppId ? [xAppId] : []),
];

/**
 * Get the amount of $B3TR an xApp can claim from an allocation round
 *
 * @param thor - thor client
 * @param queryClient - react query client
 * @param networkType - network type
 * @param roundId - the round id
 * @param xAppId - the xApp id
 * @returns amount of $B3TR an xApp can claim from an allocation round
 */
export const useXAppRoundEarnings = (
    thor: ThorClient,
    queryClient: QueryClient,
    networkType: NETWORK_TYPE,
    roundId: string,
    xAppId: string
) => {
    return useQuery({
        queryKey: getXAppRoundEarningsQueryKey(roundId, xAppId),
        queryFn: async () => {
            const data = await queryClient.ensureQueryData({
                queryFn: () => getRoundXApps(thor, networkType, roundId),
                queryKey: getRoundXAppsQueryKey(roundId),
            });

            const isXAppInRound = data.some((app) => app.id === xAppId);

            if (!isXAppInRound) return { amount: '0', xAppId };

            return await getXAppRoundEarnings(
                thor,
                roundId,
                xAppId,
                networkType,
            );
        },
        enabled: !!thor && !!roundId && !!xAppId,
    });
};

/**
 *  Get the amount of $B3TR every xApp earned from an allocation round
 * @param thor - thor client
 * @param queryClient - react query client
 * @param networkType - network type
 * @param roundId - the round id
 * @param xAppIds - the xApp ids
 * @returns  the amount of $B3TR every xApp earned from an allocation round
 */
export const useMultipleXAppRoundEarnings = (
    thor: ThorClient,
    queryClient: QueryClient,
    networkType: NETWORK_TYPE,
    roundId: string,
    xAppIds: string[],
) => {
    return useQuery({
        queryKey: getXAppRoundEarningsQueryKey(roundId, 'ALL'),
        queryFn: async () => {
            const data = await queryClient.ensureQueryData({
                queryFn: () => getRoundXApps(thor, networkType, roundId),
                queryKey: getRoundXAppsQueryKey(roundId),
            });

            const xAllocationPoolContract = getConfig(
                networkType,
            ).xAllocationPoolContractAddress;
            const xAppsInRound = data.filter((app) => xAppIds.includes(app.id));

            const contract = thor.contracts.load(
                xAllocationPoolContract,
                XAllocationPool__factory.abi,
            );
            const clauses = xAppsInRound.map((app) =>
                contract.clause.roundEarnings(roundId, app.id),
            );

            const res = await thor.transactions.executeMultipleClausesCall(
                clauses,
            );

            if (!res.every((r) => r.success))
                throw new Error('Failed to fetch xApp round earnings');

            const decoded = res.map((earnings, index) => {
                const parsedAmount = formatEther(
                    earnings.result.plain as bigint,
                );
                const appId = xAppsInRound[index]?.id as string;
                // Update the cache with the new amount
                queryClient.setQueryData(
                    getXAppRoundEarningsQueryKey(roundId, appId),
                    {
                        amount: parsedAmount,
                        appId,
                    },
                );
                return { amount: parsedAmount, appId };
            });

            return decoded;
        },
        enabled: !!thor && !!roundId && !!xAppIds.length,
    });
};
