import { getConfig } from '@/config';
import { useCallClause } from '@utils';
import { namehash } from 'viem';
import { NETWORK_TYPE } from "@config/network";

const nameInterfaceAbi = [
    {
        type: 'function',
        name: 'resolver',
        inputs: [
            {
                type: 'bytes32',
                name: 'node',
                internalType: 'bytes32',
            },
        ],
        outputs: [
            {
                type: 'address',
                name: 'resolverAddress',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
] as const;

export const getResolverAddressQueryKey = (domain?: string) => [
    'VECHAIN_KIT',
    'RESOLVER_ADDRESS',
    domain,
];

/**
 * Hook to get resolver address for a VET domain
 * @param networkType
 * @param domain The domain to get resolver for
 * @returns The resolver address for the domain
 */
export const useGetResolverAddress = (
    networkType: NETWORK_TYPE,
    domain?: string
) => {
    return useCallClause({
        address: getConfig(networkType).vetDomainsContractAddress,
        abi: nameInterfaceAbi,
        method: 'resolver',
        args: [domain ? namehash(domain) : '0x'],
        queryOptions: {
            select: (data: any) => data[0],
            enabled: !!domain,
        },
    });
};
