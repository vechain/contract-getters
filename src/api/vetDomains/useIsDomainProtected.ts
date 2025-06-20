import { getConfig } from '@config';
import { SubdomainClaimer__factory } from '@contracts';
import { useThor } from '@vechain/dapp-kit-react';
import { NETWORK_TYPE } from '@/config/network';
import { ThorClient } from '@vechain/sdk-network';
import { useQuery } from '@tanstack/react-query';

export const getIsDomainProtectedQueryKey = (domain?: string) => [
    'VECHAIN_KIT_DOMAIN',
    domain,
    'IS_DOMAIN_PROTECTED',
];

const getIsDomainProtected = async (
    thor: ThorClient,
    network: NETWORK_TYPE,
    domain?: string,
) => {
    const contractAddress =
        getConfig(network).veWorldSubdomainClaimerContractAddress;

    const res = await thor.contracts
        .load(contractAddress, SubdomainClaimer__factory.abi)
        .read.isDomainProtected(domain);

    return res[0] as boolean;
};

/**
 * Custom hook to fetch the amount of B3TR tokens donated for a given token ID.
 *
 * @param networkType
 * @param {string} [domain] - The domain to fetch the protection status for.
 * @param {boolean} [enabled=true] - Flag to enable or disable the hook.
 * @returns The result of the useCall hook, with the donation amount formatted in Ether.
 */
export const useIsDomainProtected = (
    networkType: NETWORK_TYPE,
    domain?: string,
    enabled = true
) => {
    const thor = useThor();

    return useQuery({
        queryKey: getIsDomainProtectedQueryKey(domain),
        queryFn: () => getIsDomainProtected(thor, networkType, domain),
        enabled: !!domain && enabled && !!networkType,
    });
};
