import { useQuery } from '@tanstack/react-query';
import { useXAppsMetadataBaseUri, useXApp, getXAppMetadata } from '@thor';
import { NETWORK_TYPE } from "@config/network";

export const getXAppMetadataQueryKey = (metadataURI?: string) => [
    'VECHAIN_KIT',
    'xApps',
    metadataURI,
    'metadata',
];

/**
 * Hook to fetch the metadata of an xApp from the xApps metadata base uri
 * @param networkType - network type
 * @param xAppId - The id of the xApp
 * @returns  The metadata of the xApp
 */
export const useXAppMetadata = (
    networkType: NETWORK_TYPE,
    xAppId?: string
) => {
    const { data: baseUri } = useXAppsMetadataBaseUri(networkType);
    const { data: xApp } = useXApp(networkType, xAppId ?? '');

    return useQuery({
        queryKey: getXAppMetadataQueryKey(xApp?.metadataURI || ''),
        queryFn: async () =>
            !(!baseUri && xApp)
                ? await getXAppMetadata(
                      `${baseUri}${xApp?.metadataURI}`,
                      networkType,
                  )
                : null,
        enabled: !!baseUri && !!xApp && !!networkType,
    });
};
