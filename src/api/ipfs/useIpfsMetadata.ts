import { useQuery } from '@tanstack/react-query';
import { convertUriToUrl } from '@/utils';
import { NETWORK_TYPE } from '@/config/network';

/**
 * Fetches metadata from IPFS for a given URI
 *
 * @param networkType - The network type
 * @param uri - The IPFS URI
 * @param parseJson - Whether to parse the JSON
 * @returns The metadata
 */
export const getIpfsMetadata = async <T>(
    networkType: NETWORK_TYPE,
    uri?: string,
    parseJson = false,
): Promise<T> => {
    if (!uri) throw new Error('No URI provided');
    const newUri = convertUriToUrl(uri, networkType);
    if (!newUri) throw new Error('Invalid URI');

    const response = await fetch(newUri, {
        headers: {
            'X-Project-Id': 'vechain-kit',
        },
    });
    const data = await response.text();

    if (parseJson) return JSON.parse(data);

    return data as unknown as T;
};

export const getIpfsMetadataQueryKey = (
    networkType: NETWORK_TYPE,
    ipfsUri?: string,
) => ['VECHAIN_KIT', 'IPFS_METADATA', networkType, ipfsUri];

/**
 * Fetches metadata from IPFS for a given URI
 * @param networkType
 * @param ipfsUri - The IPFS URI
 * @param parseJson
 * @returns The metadata from IPFS
 */
export const useIpfsMetadata = <T>(
    networkType: NETWORK_TYPE,
    ipfsUri?: string,
    parseJson = false
) => {
    return useQuery({
        queryKey: getIpfsMetadataQueryKey(networkType, ipfsUri),
        queryFn: () => getIpfsMetadata<T>(networkType, ipfsUri, parseJson),
        enabled: !!ipfsUri && !!networkType,
        staleTime: Infinity,
    });
};
