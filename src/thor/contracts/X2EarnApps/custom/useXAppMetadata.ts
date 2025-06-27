import { useQuery } from '@tanstack/react-query';
import { useXAppsMetadataBaseUri, useXApp, getXAppMetadata } from '@thor';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

export const getXAppMetadataQueryKey = (metadataURI?: string) => [
    'VECHAIN_KIT',
    'xApps',
    metadataURI,
    'metadata',
];

/**
 * Hook to fetch the metadata of an xApp from the xApps metadata base uri
 * @param thor - thor client
 * @param networkType - network type
 * @param xAppId - The id of the xApp
 * @returns  The metadata of the xApp
 */
export const useXAppMetadata = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    xAppId?: string
) => {
    const { data: baseUri } = useXAppsMetadataBaseUri(thor, networkType);
    const { data: xApp } = useXApp(thor, networkType, xAppId ?? '');

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
