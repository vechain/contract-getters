import { SimpleAccountFactory__factory } from '@contracts';
import { NETWORK_TYPE } from '@config/network';
import { getConfig } from '@config';
import { getCallClauseQueryKey, useCallClause } from '@utils';
import { ThorClient } from '@vechain/sdk-network';

const abi = SimpleAccountFactory__factory.abi;

export const getAccountVersionQueryKey = (
    accountAddress: string,
    ownerAddress: string,
    networkType: NETWORK_TYPE,
) =>
    getCallClauseQueryKey<typeof abi>({
        address: getConfig(networkType).accountFactoryAddress,
        method: 'getAccountVersion',
        args: [accountAddress as `0x${string}`, ownerAddress as `0x${string}`],
    });

/**
 * Check if a smart account has a v1 smart account
 * @param thor - The ThorClient instance.
 * @param networkType - network type
 * @param accountAddress - The address of the smart account
 * @param ownerAddress - The address of the owner of the smart account
 * @returns The version of the smart account
 */
export const useGetAccountVersion = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    accountAddress: string,
    ownerAddress: string,
) => {

    return useCallClause({
        thor,
        address: getConfig(networkType).accountFactoryAddress,
        abi,
        method: 'getAccountVersion',
        args: [accountAddress as `0x${string}`, ownerAddress as `0x${string}`],
        queryOptions: {
            select: (data) => {
                return {
                    version: parseInt(data[0].toString()),
                    isDeployed: data[1],
                };
            },
        },
    });
};
