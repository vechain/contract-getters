import { GalaxyMember__factory } from '@contracts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getConfig } from '@config';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

/**
 * Generates a query key for the getTokensInfoByOwner query.
 * @param owner - The address of the token owner.
 * @returns An array representing the query key.
 */
export const getTokensInfoByOwnerQueryKey = (owner?: string | null) => [
    'VECHAIN_KIT_GALAXY_MEMBER_TOKENS_INFO',
    owner,
];

/**
 * Custom hook to fetch token information for a specific owner with infinite scrolling support.
 * @param thor - thor client
 * @param networkType - network type
 * @param owner - The address of the token owner.
 * @param size - The number of tokens to fetch per page.
 * @returns An infinite query result containing the token information and pagination controls.
 */
export const useGalaxyMemberTokensInfo = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    owner: string | null,
    size: number = 10,
) => {
    const contractAddress = getConfig(networkType).galaxyMemberContractAddress;

    const fetchTokens = async ({ pageParam = 0 }) => {
        const data = await thor.contracts
            .load(contractAddress, GalaxyMember__factory.abi)
            .read.getTokensInfoByOwner(owner, pageParam, size);

        if (!data)
            throw new Error(
                `Failed to fetch tokens info for page ${pageParam}`,
            );

        return { data, nextPage: pageParam + 1 };
    };

    return useInfiniteQuery({
        queryKey: getTokensInfoByOwnerQueryKey(owner),
        queryFn: fetchTokens,
        getNextPageParam: (lastPage) =>
            lastPage.data.length === size ? lastPage.nextPage : undefined,
        enabled: !!owner && !!networkType,
        initialPageParam: 0,
    });
};
