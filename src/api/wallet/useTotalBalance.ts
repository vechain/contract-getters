import { useMemo } from 'react';
import { useTokensWithValues } from './useTokensWithValues';
import {
    SupportedCurrency,
    formatCompactCurrency,
} from '@utils/currencyUtils';
import { useCurrency } from '@utils/useCurrency';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

type UseTotalBalanceProps = {
    thor: ThorClient;
    networkType: NETWORK_TYPE;
    address?: string;
};

export const useTotalBalance = ({ thor, networkType, address = '' }: UseTotalBalanceProps) => {
    const { tokensWithBalance, isLoading } = useTokensWithValues({ thor, networkType, address });
    const { currentCurrency } = useCurrency();

    const totalBalanceInCurrency = useMemo(() => {
        return tokensWithBalance.reduce(
            (total, token) => total + token.valueInCurrency,
            0,
        );
    }, [tokensWithBalance]);

    const totalBalanceUsd = useMemo(() => {
        return tokensWithBalance.reduce(
            (total, token) => total + token.valueUsd,
            0,
        );
    }, [tokensWithBalance]);

    const formattedBalance = useMemo(() => {
        return formatCompactCurrency(
            totalBalanceInCurrency,
            currentCurrency as SupportedCurrency,
        );
    }, [totalBalanceInCurrency, currentCurrency]);

    return {
        totalBalanceInCurrency,
        totalBalanceUsd,
        formattedBalance,
        isLoading,
        hasAnyBalance: tokensWithBalance.length > 0,
    };
};
