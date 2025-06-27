import { VeBetterPassport__factory } from '@contracts';
import { useCallClause, getCallClauseQueryKey } from '@utils';
import { getConfig } from '@config';
import { NETWORK_TYPE } from '@config/network';
import { ZERO_ADDRESS } from '@vechain/sdk-core';
import { ThorClient } from '@vechain/sdk-network';

const contractAbi = VeBetterPassport__factory.abi;
const method = 'isPersonAtTimepoint' as const;

/**
 * Returns the query key for fetching the isPerson status at a given block number.
 * @param networkType - The network type.
 * @param user - The user address.
 * @param timepoint - The block number (as a string or number).
 * @returns The query key for fetching the isPerson status at a given block number.
 */
export const getIsPersonAtTimepointQueryKey = (
    networkType: NETWORK_TYPE,
    user: string,
    timepoint: string, // Will be converted to Number for args
) => {
    const veBetterPassportContractAddress =
        getConfig(networkType).veBetterPassportContractAddress;
    return getCallClauseQueryKey<typeof contractAbi>({
        address: veBetterPassportContractAddress,
        method,
        args: [user as `0x${string}`, Number(timepoint)],
    });
};

/**
 * Hook to get the isPerson status from the VeBetterPassport contract at a specific timepoint.
 * @param thor - The ThorClient instance.
 * @param networkType
 * @param user - The user address.
 * @param timepoint - The block number (as a string or number).
 * @param customEnabled - Flag to enable or disable the hook. Default is true.
 * @returns The isPerson status (boolean) at a given block number.
 */
export const useIsPersonAtTimepoint = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    user?: string,
    timepoint?: string,
    customEnabled = true,
) => {
    const veBetterPassportContractAddress = getConfig(
        networkType,
    ).veBetterPassportContractAddress;

    // VeBetter Passport is person at timepoint result: [ false, 'User has been signaled too many times' ]
    return useCallClause({
        thor,
        abi: contractAbi,
        address: veBetterPassportContractAddress,
        method,
        args: [
            (user as `0x${string}`) ?? ZERO_ADDRESS,
            timepoint ? Number(timepoint) : 0,
        ],
        queryOptions: {
            enabled:
                !!user &&
                timepoint !== undefined &&
                customEnabled &&
                !!veBetterPassportContractAddress &&
                !!networkType &&
                !!thor,
            select: (data) => data[0],
        },
    });
};
