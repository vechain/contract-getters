import { useQuery } from '@tanstack/react-query';
import { XAllocationPool__factory } from '@contracts';
import { getConfig } from '@config';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

/**
 *  Returns the query key for the shares of multiple xApps in an allocation round.
 * @param roundId  the roundId the get the shares for
 */
export const getXAppsSharesQueryKey = (roundId?: number | string) => [
    'VECHAIN_KIT',
    'XApps',
    'Shares',
    roundId,
];

/**
 * Fetch shares of multiple xApps in an allocation round
 * @param thor - thor client
 * @param networkType - network type
 * @param apps - the xApps to get the shares for
 * @param roundId - the round id to get the shares for
 * @returns  the shares (% of allocation pool) for the xApps in the round { allocated: number, unallocated: number }
 *
 */
export const useXAppsShares = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    apps: string[],
    roundId?: string
) => {
    return useQuery({
        queryKey: getXAppsSharesQueryKey(roundId),
        queryFn: async () => {
            const contract = thor.contracts.load(
                getConfig(networkType).xAllocationPoolContractAddress,
                XAllocationPool__factory.abi,
            );
            const clauses = apps.map((app) =>
                contract.clause.getAppShares(roundId, app),
            );
            const res = await thor.transactions.executeMultipleClausesCall(
                clauses,
            );
            if (!res.every((r) => r.success))
                throw new Error(
                    `Failed to fetch xApps shares for ${apps} in round ${roundId}`,
                );

            const shares = res.map((r, index) => {
                return {
                    app: apps[index] as string,
                    share: Number(r.result.array?.[0] || 0) / 100,
                    unallocatedShare: Number(r.result.array?.[1] || 0) / 100,
                };
            });
            return shares;
        },
        enabled: !!roundId && !!apps.length,
    });
};
