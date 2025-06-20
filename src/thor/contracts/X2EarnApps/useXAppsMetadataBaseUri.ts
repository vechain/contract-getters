import { getCallClauseQueryKey, useCallClause } from '@utils';
import { X2EarnApps__factory } from '@contracts';
import { NETWORK_TYPE } from '@config/network';
import { getConfig } from '@config';

const abi = X2EarnApps__factory.abi;
const method = 'baseURI' as const;

export const getXAppsMetadataBaseUriQueryKey = (network: NETWORK_TYPE) =>
    getCallClauseQueryKey<typeof abi>({
        method,
        address: getConfig(network).x2EarnAppsContractAddress,
        args: [],
    });

/**
 *  Hook to get the baseUri of the xApps metadata
 * @returns the baseUri of the xApps metadata
 */
export const useXAppsMetadataBaseUri = (networkType: NETWORK_TYPE) => {
    // X2Earn Apps metadata base URI result: [ 'ipfs://' ]
    return useCallClause({
        abi,
        address: getConfig(networkType).x2EarnAppsContractAddress,
        method,
        args: [],
        queryOptions: {
            enabled: !!networkType,
            staleTime: 1000 * 60 * 60, // 1 hour,
        },
    });
};
