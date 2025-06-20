import { QueryClient } from '@tanstack/react-query';
import { useWallet, WalletConfig } from '@api/wallet';
import {
    getAccountVersionQueryKey,
    getUpgradeRequiredQueryKey,
    getUpgradeRequiredForAccountQueryKey,
    getCurrentAccountImplementationVersionQueryKey,
    getAccountImplementationAddressQueryKey,
    getHasV1SmartAccountQueryKey,
    getAccountAddressQueryKey,
} from '@thor';
import { NETWORK_TYPE } from "@config/network";

/**
 * Hook to refresh smart account factory-related queries
 * @returns Object with refresh function
 */
export const useRefreshFactoryQueries = (
    networkType: NETWORK_TYPE,
    queryClient: QueryClient,
    walletConfig: WalletConfig,
) => {
    const { connectedWallet, smartAccount } = useWallet(walletConfig);

    const refresh = async () => {
        const ownerAddress = connectedWallet?.address ?? '';
        const smartAccountAddress = smartAccount?.address ?? '';

        // First cancel all queries
        await Promise.all([
            // Factory related queries
            queryClient.cancelQueries({
                queryKey: getAccountAddressQueryKey(ownerAddress, networkType),
            }),
            queryClient.cancelQueries({
                queryKey: getAccountVersionQueryKey(
                    smartAccountAddress,
                    ownerAddress,
                    networkType,
                ),
            }),
            queryClient.cancelQueries({
                queryKey: getHasV1SmartAccountQueryKey(
                    ownerAddress,
                    networkType,
                ),
            }),
            queryClient.cancelQueries({
                queryKey: getCurrentAccountImplementationVersionQueryKey(
                    networkType,
                ),
            }),

            // Upgrade related queries - using current version 3 as default
            queryClient.cancelQueries({
                queryKey: getUpgradeRequiredQueryKey(
                    smartAccountAddress,
                    ownerAddress,
                    3,
                    networkType,
                ),
            }),
            queryClient.cancelQueries({
                queryKey: getUpgradeRequiredForAccountQueryKey(
                    smartAccountAddress,
                    3,
                    networkType,
                ),
            }),
            queryClient.cancelQueries({
                queryKey: getAccountImplementationAddressQueryKey(
                    3,
                    networkType,
                ),
            }),
        ]);

        // Then refetch all queries
        await Promise.all([
            // Factory related queries
            queryClient.refetchQueries({
                queryKey: getAccountAddressQueryKey(ownerAddress, networkType),
            }),
            queryClient.refetchQueries({
                queryKey: getAccountVersionQueryKey(
                    smartAccountAddress,
                    ownerAddress,
                    networkType,
                ),
            }),
            queryClient.refetchQueries({
                queryKey: getHasV1SmartAccountQueryKey(
                    ownerAddress,
                    networkType,
                ),
            }),
            queryClient.refetchQueries({
                queryKey: getCurrentAccountImplementationVersionQueryKey(
                    networkType,
                ),
            }),

            // Upgrade related queries - using current version 3 as default
            queryClient.refetchQueries({
                queryKey: getUpgradeRequiredQueryKey(
                    smartAccountAddress,
                    ownerAddress,
                    3,
                    networkType,
                ),
            }),
            queryClient.refetchQueries({
                queryKey: getUpgradeRequiredForAccountQueryKey(
                    smartAccountAddress,
                    3,
                    networkType,
                ),
            }),
            queryClient.refetchQueries({
                queryKey: getAccountImplementationAddressQueryKey(
                    3,
                    networkType,
                ),
            }),
        ]);
    };

    return { refresh };
};
