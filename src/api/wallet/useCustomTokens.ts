import {
    CustomTokenInfo,
    getTokenInfo,
} from '@thor/contracts';
import {
    LocalStorageKey,
    useLocalStorage,
} from '@cache';
import { compareAddresses } from '@utils';
import { getConfig } from '@config';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

export const useCustomTokens = (
    thor: ThorClient,
    networkType: NETWORK_TYPE
) => {
    const [customTokens, setCustomTokens] = useLocalStorage<CustomTokenInfo[]>(
        LocalStorageKey.CUSTOM_TOKENS,
        [],
    );

    const addToken = async (address: CustomTokenInfo['address']) => {
        if (!isTokenIncluded(address) && !isDefaultToken(address)) {
            const tokenInfo = await getTokenInfo(thor, address);

            const token: CustomTokenInfo = {
                ...tokenInfo,
                address,
            };

            setCustomTokens([...customTokens, token]);
        }
    };

    const removeToken = (address: string) => {
        setCustomTokens(
            customTokens.filter((t: CustomTokenInfo) => t.address !== address),
        );
    };

    const isTokenIncluded = (address: string) => {
        return customTokens.some((t: CustomTokenInfo) =>
            compareAddresses(t.address, address),
        );
    };

    const isDefaultToken = (address: string) => {
        // Get contract addresses from config
        const contractAddresses = {
            vet: '0x', // VET has no contract address since it's the native token
            vtho: getConfig(networkType).vthoContractAddress,
            b3tr: getConfig(networkType).b3trContractAddress,
            vot3: getConfig(networkType).vot3ContractAddress,
            veDelegate: getConfig(networkType).veDelegate,
        };

        return Object.values(contractAddresses).includes(address);
    };

    return {
        customTokens,
        addToken,
        removeToken,
        isTokenIncluded,
        isDefaultToken,
    };
};
