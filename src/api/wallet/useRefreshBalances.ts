import { useQueryClient } from '@tanstack/react-query';
import { useWallet } from './useWallet';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from '@vechain/sdk-network';

export const useRefreshBalances = (thor: ThorClient, networkType: NETWORK_TYPE) => {
    const queryClient = useQueryClient();
    const { account } = useWallet({ thor, networkType });

    const refresh = async () => {
        const address = account?.address ?? '';

        await Promise.all([
            // getAccountBalanceQueryKey
            // getB3trBalanceQueryKey
            // getVot3BalanceQueryKey
            // getVeDelegateBalanceQueryKey
            // getCustomTokenBalanceQueryKey
            queryClient.invalidateQueries({
                queryKey: ['VECHAIN_KIT_BALANCE', address],
            }),
            // getTokenUsdPriceQueryKey
            queryClient.invalidateQueries({
                queryKey: ['VECHAIN_KIT_PRICE'],
            }),
        ]);
    };

    return { refresh };
};
