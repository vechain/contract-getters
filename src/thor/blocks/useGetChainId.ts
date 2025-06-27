import { useQuery } from '@tanstack/react-query';
import { ThorClient } from '@vechain/sdk-network';

export const getChainId = async (thor: ThorClient) => {
    const genesisBlock = await thor.blocks.getGenesisBlock();
    if (!genesisBlock) throw new Error('Genesis block not found');
    const chainId = genesisBlock.id;

    return chainId;
};
export const getChainIdQueryKey = () => ['VECHAIN_KIT_CHAIN_ID'];

/**
 *  Get the account balance for the given address
 * @param thor - thor client
 * @returns  The account balance
 */
export const useGetChainId = (thor: ThorClient) => {
    return useQuery({
        queryKey: getChainIdQueryKey(),
        queryFn: () => getChainId(thor),
        enabled: !!thor,
        refetchInterval: 10000,
    });
};
