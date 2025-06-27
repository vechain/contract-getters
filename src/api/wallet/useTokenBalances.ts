import { useMemo } from 'react';
import {
    useAccountBalance,
    useGetB3trBalance,
    useGetVot3Balance,
    useGetVeDelegateBalance,
    useGetErc20Balance,
    useGetCustomTokenBalances,
} from '@thor';
import { getConfig } from '@config';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from '@vechain/sdk-network';

export type WalletTokenBalance = {
    address: string;
    symbol: string;
    balance: string;
};

type UseTokenBalancesProps = {
    thor: ThorClient;
    networkType: NETWORK_TYPE;
    address?: string;
};

// TODO: migration check if we can remove hooks inside and bundle this into one query using thor.transactions.executeMultipleClausesCall
// check example of useTokenBalances2
export const useTokenBalances = ({
    thor,
    networkType,
    address = '',
}: UseTokenBalancesProps) => {
    const config = getConfig(networkType);

    // Base token balances
    const { data: vetData, isLoading: vetLoading } = useAccountBalance(thor, address);
    const { data: b3trBalance, isLoading: b3trLoading } =
        useGetB3trBalance(thor, networkType, address);
    const { data: vot3Balance, isLoading: vot3Loading } =
        useGetVot3Balance(thor, networkType, address);
    const { data: veDelegateBalance, isLoading: veDelegateLoading } =
        useGetVeDelegateBalance(thor, networkType, address);
    const { data: gloDollarBalance, isLoading: gloDollarLoading } =
        useGetErc20Balance(thor, config.gloDollarContractAddress, address);

    // Custom token balances
    const customTokenBalancesQueries = useGetCustomTokenBalances(thor, networkType, address);
    const customTokenBalances = customTokenBalancesQueries
        .map((query) => query.data)
        .filter(Boolean);
    const customTokensLoading = customTokenBalancesQueries.some(
        (query) => query.isLoading,
    );

    // Get all balances
    const balances = useMemo(() => {
        if (!address) return [];

        // Get contract addresses from config
        const contractAddresses = {
            vet: '0x',
            vtho: config.vthoContractAddress,
            b3tr: config.b3trContractAddress,
            vot3: config.vot3ContractAddress,
            veDelegate: config.veDelegate,
            USDGLO: config.gloDollarContractAddress,
        };

        // Base tokens
        const baseTokens: WalletTokenBalance[] = [
            {
                address: contractAddresses.vet,
                symbol: 'VET',
                balance: vetData?.balance || '0',
            },
            {
                address: contractAddresses.vtho,
                symbol: 'VTHO',
                balance: vetData?.energy || '0',
            },
            {
                address: contractAddresses.b3tr,
                symbol: 'B3TR',
                balance: b3trBalance?.scaled ?? '0',
            },
            {
                address: contractAddresses.vot3,
                symbol: 'VOT3',
                balance: vot3Balance?.scaled ?? '0',
            },
            {
                address: contractAddresses.veDelegate,
                symbol: 'veDelegate',
                balance: veDelegateBalance?.scaled ?? '0',
            },
            {
                address: contractAddresses.USDGLO,
                symbol: 'USDGLO',
                balance: gloDollarBalance?.scaled ?? '0',
            },
        ];

        // Add custom tokens
        const customTokens: WalletTokenBalance[] = customTokenBalances.map(
            (token: any) => ({
                address: token?.address || '',
                symbol: token?.symbol || '',
                balance: token?.scaled || '0',
            }),
        );

        return [...baseTokens, ...customTokens];
    }, [
        address,
        vetData,
        b3trBalance,
        vot3Balance,
        veDelegateBalance,
        gloDollarBalance,
        customTokenBalances,
        networkType,
    ]);

    const isLoading =
        vetLoading ||
        b3trLoading ||
        vot3Loading ||
        veDelegateLoading ||
        gloDollarLoading ||
        customTokensLoading;

    return {
        balances,
        isLoading,
    };
};
