import { ExchangeRates } from '@api/wallet';
import { CURRENCY } from "@types";

export const convertToSelectedCurrency = (
    amountUsd: number,
    currency: CURRENCY,
    exchangeRates: ExchangeRates,
): number => {
    switch (currency) {
        case 'eur':
            return amountUsd / exchangeRates.eurUsdPrice;
        case 'gbp':
            return amountUsd / exchangeRates.gbpUsdPrice;
        default:
            return amountUsd;
    }
};

export const formatCurrencyValue = (
    value: number,
    currency: CURRENCY,
    options?: Intl.NumberFormatOptions,
    locale = 'en-US',
): string => {
    const defaultOptions: Intl.NumberFormatOptions = {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...options,
    };

    return new Intl.NumberFormat(locale, defaultOptions).format(value);
};

export const formatCompactCurrency = (
    value: number,
    currency: CURRENCY,
    locale?: string,
): string => {
    return formatCurrencyValue(
        value,
        currency,
        {
            notation: 'compact',
            compactDisplay: 'short',
        },
        locale,
    );
};
