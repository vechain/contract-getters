import { useQueries } from '@tanstack/react-query';
import { getIpfsMetadata, getIpfsMetadataQueryKey } from './useIpfsMetadata';
import {NETWORK_TYPE} from "@config/network";

/**
 * Fetches metadatas from IPFS for given URIs
 * @param networkType
 * @param ipfsUris - The IPFS URIs
 * @param parseJson
 * @returns The metadata from IPFS for each URI
 */
export const useIpfsMetadatas = <T>(
    networkType: NETWORK_TYPE,
    ipfsUris: string[],
    parseJson = false
) => {
    return useQueries({
        queries: ipfsUris.map((uri) => ({
            queryKey: getIpfsMetadataQueryKey(networkType, uri),
            queryFn: async () => {
                return getIpfsMetadata<T>(networkType, uri, parseJson);
            },
            enabled: !!uri && !!networkType,
        })),
    });
};
