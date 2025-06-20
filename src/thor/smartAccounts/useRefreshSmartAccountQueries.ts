import { QueryClient } from '@tanstack/react-query';
import { useWallet, WalletConfig } from '@api/wallet';
import {
    getSmartAccountQueryKey,
    getVersionQueryKey,
    getIsDeployedQueryKey,
} from '@thor';

/**
 * Hook to refresh smart account-related queries
 * @returns Object with refresh function
 */
export const useRefreshSmartAccountQueries = (
    queryClient: QueryClient,
    walletConfig: WalletConfig,
) => {
    const { smartAccount } = useWallet(walletConfig);

    const refresh = async () => {
        const smartAccountAddress = smartAccount?.address ?? '';

        // First cancel all queries
        await Promise.all([
            // Smart account basic info
            queryClient.cancelQueries({
                queryKey: getSmartAccountQueryKey(smartAccountAddress),
            }),
            queryClient.cancelQueries({
                queryKey: getVersionQueryKey(smartAccountAddress),
            }),
            queryClient.cancelQueries({
                queryKey: getIsDeployedQueryKey(smartAccountAddress),
            }),
        ]);

        // Then refetch all queries
        await Promise.all([
            // Smart account basic info
            queryClient.refetchQueries({
                queryKey: getSmartAccountQueryKey(smartAccountAddress),
            }),
            queryClient.refetchQueries({
                queryKey: getVersionQueryKey(smartAccountAddress),
            }),
            queryClient.refetchQueries({
                queryKey: getIsDeployedQueryKey(smartAccountAddress),
            }),
        ]);
    };

    return { refresh };
};
