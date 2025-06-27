import { useMemo } from 'react';
import { useGetTokenUsdPrice } from '@thor/contracts/Oracle';
import { getConfig } from '@/config';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

export type ExchangeRates = {
    eurUsdPrice: number;
    gbpUsdPrice: number;
};

// TODO: migration check if we can remove hooks inside and bundle this into one query using thor.transactions.executeMultipleClausesCall
// check example in useTokenPrices2.ts
export const useTokenPrices = (thor: ThorClient, networkType: NETWORK_TYPE) => {
    const config = getConfig(networkType);

    // Fetch base token prices
    const { data: vetUsdPrice, isLoading: vetUsdPriceLoading } =
        useGetTokenUsdPrice(thor, networkType, 'VET');
    const { data: vthoUsdPrice, isLoading: vthoUsdPriceLoading } =
        useGetTokenUsdPrice(thor, networkType, 'VTHO');
    const { data: b3trUsdPrice, isLoading: b3trUsdPriceLoading } =
        useGetTokenUsdPrice(thor, networkType, 'B3TR');
    const { data: eurUsdPrice, isLoading: eurToUsdLoading } =
        useGetTokenUsdPrice(thor, networkType, 'EUR');
    const { data: gbpUsdPrice, isLoading: gbpToUsdLoading } =
        useGetTokenUsdPrice(thor, networkType, 'GBP');

    // Get all prices as a map
    const prices = useMemo(() => {
        const contractAddresses = {
            vet: '0x',
            vtho: config.vthoContractAddress,
            b3tr: config.b3trContractAddress,
            vot3: config.vot3ContractAddress,
            veDelegate: config.veDelegate,
            USDGLO: config.gloDollarContractAddress,
        };

        return {
            [contractAddresses.vet]: vetUsdPrice || 0,
            [contractAddresses.vtho]: vthoUsdPrice || 0,
            [contractAddresses.b3tr]: b3trUsdPrice || 0,
            // VOT3 and veDelegate share the same price feed as B3TR
            [contractAddresses.vot3]: b3trUsdPrice || 0,
            [contractAddresses.veDelegate]: b3trUsdPrice || 0,
            [contractAddresses.USDGLO]: 1, // GloDollar is pegged to USD
        };
    }, [
        vetUsdPrice,
        vthoUsdPrice,
        b3trUsdPrice,
        config.vthoContractAddress,
        config.b3trContractAddress,
        config.vot3ContractAddress,
        config.veDelegate,
        config.gloDollarContractAddress,
    ]);

    const exchangeRates: ExchangeRates = useMemo(
        () => ({
            eurUsdPrice: eurUsdPrice || 1,
            gbpUsdPrice: gbpUsdPrice || 1,
        }),
        [eurUsdPrice, gbpUsdPrice],
    );

    const isLoading =
        vetUsdPriceLoading ||
        vthoUsdPriceLoading ||
        b3trUsdPriceLoading ||
        eurToUsdLoading ||
        gbpToUsdLoading;

    return {
        prices,
        exchangeRates,
        isLoading,
    };
};
