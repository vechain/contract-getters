import { useState, useEffect } from 'react';
import { CURRENCY } from '@/types';
import { SupportedCurrency } from "@utils/currencyUtils";

const STORAGE_KEY = 'vechain_kit_currency';
const allCurrencies: CURRENCY[] = ['usd', 'eur', 'gbp'];

/**
 * Hook for managing currency preferences
 */
export const useCurrency = (defaultCurrency: SupportedCurrency  = 'usd') => {
    const [currentCurrency, setCurrentCurrency] = useState<CURRENCY>(() => {
        try {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            return (stored as CURRENCY) || defaultCurrency;
        } catch (error) {
            console.error(error);
            return defaultCurrency;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, currentCurrency);
        } catch (error) {
            console.error('Failed to store currency preference:', error);
        }
    }, [currentCurrency]);

    const changeCurrency = (newCurrency: CURRENCY) => {
        if (!allCurrencies.includes(newCurrency)) {
            console.error(`Invalid currency: ${newCurrency}`);
            return;
        }
        setCurrentCurrency(newCurrency);
    };

    return {
        currentCurrency,
        allCurrencies,
        changeCurrency,
    };
};
