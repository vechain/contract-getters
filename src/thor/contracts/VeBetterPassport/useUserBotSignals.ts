import { getCallClauseQueryKey, useCallClause } from '@utils';
import { getConfig } from '@config';
import { VeBetterPassport__factory } from '@contracts';
import { NETWORK_TYPE } from '@config/network';

const contractAbi = VeBetterPassport__factory.abi;
const method = 'signaledCounter' as const;

/**
 * Returns the query key for fetching the user bot signals.
 * @param networkType The network type.
 * @param userAddress - The user address.
 * @returns The query key for fetching the user bot signals.
 */
export const getUserBotSignalsQueryKey = (
    networkType: NETWORK_TYPE,
    userAddress: string,
) => {
    return getCallClauseQueryKey<typeof contractAbi>({
        address: getConfig(networkType).veBetterPassportContractAddress,
        method,
        args: [userAddress as `0x${string}`],
    });
};

/**
 * Hook to get the user bot signals (signaledCounter) from the VeBetterPassport contract.
 * @param networkType - network type
 * @param userAddressInput - The user address.
 * @returns The user bot signals
 */
export const useUserBotSignals = (
    networkType: NETWORK_TYPE,
    userAddressInput?: string
) => {
    const veBetterPassportContractAddress = getConfig(
        networkType,
    ).veBetterPassportContractAddress;

    // VeBetter Passport user bot signals result: [ 1n ]
    return useCallClause({
        address: veBetterPassportContractAddress,
        abi: contractAbi,
        method,
        args: [userAddressInput as `0x${string}`],
        queryOptions: {
            enabled:
                !!userAddressInput &&
                !!veBetterPassportContractAddress &&
                !!networkType,
            select: (res) => Number(res[0]),
        },
    });
};
