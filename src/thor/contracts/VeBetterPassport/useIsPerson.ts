import { getConfig } from '@/config';
import { VeBetterPassport__factory } from '@contracts';
import { useCallClause, getCallClauseQueryKey } from '@utils';
import { NETWORK_TYPE } from '@/config/network';
import { ZERO_ADDRESS } from '@vechain/sdk-core';
import { ThorClient } from '@vechain/sdk-network';

const contractAbi = VeBetterPassport__factory.abi;
const method = 'isPerson' as const;

/**
 * Returns the query key for fetching the isPerson status.
 * @param networkType - The network type.
 * @param user - The user address.
 * @returns The query key for fetching the isPerson status.
 */
export const getIsPersonQueryKey = (
    networkType: NETWORK_TYPE,
    user: string,
) => {
    const veBetterPassportContractAddress =
        getConfig(networkType).veBetterPassportContractAddress;
    return getCallClauseQueryKey<typeof contractAbi>({
        address: veBetterPassportContractAddress,
        method,
        args: [user as `0x${string}`],
    });
};

/**
 * Hook to get the isPerson status from the VeBetterPassport contract.
 * @param thor - The ThorClient instance.
 * @param networkType - network type
 * @param user - The user address.
 * @param customEnabled - Flag to enable or disable the hook. Default is true.
 * @returns The isPerson status (boolean).
 */
export const useIsPerson = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    user?: string,
    customEnabled = true
) => {
    const veBetterPassportContractAddress = getConfig(
        networkType,
    ).veBetterPassportContractAddress;

    // VeBetter Passport is person result: [ false, 'User has been signaled too many times' ]
    return useCallClause({
        thor,
        abi: contractAbi,
        address: veBetterPassportContractAddress,
        method,
        args: [(user as `0x${string}`) ?? ZERO_ADDRESS],
        queryOptions: {
            enabled:
                !!user &&
                customEnabled &&
                !!veBetterPassportContractAddress &&
                !!networkType &&
                !!thor,
            select: (data) => data[0],
        },
    });
};

/**
 * Hook to get the isPerson status from the VeBetterPassport contract for the current user.
 * @param thor - The ThorClient instance.
 * @param networkType
 * @param address - The address of the account.
 * @returns The isPerson status.
 */
export const useIsUserPerson = (thor: ThorClient, networkType: NETWORK_TYPE, address?: string) => {
    return useIsPerson(thor, networkType, address);
};
