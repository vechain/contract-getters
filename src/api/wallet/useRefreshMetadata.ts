import { useQueryClient } from '@tanstack/react-query';
import {
    getAvatarOfAddressQueryKey,
    getAvatarQueryKey,
    getTextRecordsQueryKey,
} from '@api/vetDomains';
import { NETWORK_TYPE } from "@config/network";

export const useRefreshMetadata = (
    networkType: NETWORK_TYPE,
    domain: string,
    address: string
) => {
    const queryClient = useQueryClient();

    const refresh = async () => {
        await Promise.all([
            queryClient.invalidateQueries({
                queryKey: getAvatarQueryKey(domain ?? '', networkType),
            }),
            queryClient.invalidateQueries({
                queryKey: getTextRecordsQueryKey(domain, networkType),
            }),
            queryClient.invalidateQueries({
                queryKey: getAvatarOfAddressQueryKey(address),
            }),
        ]);
    };

    return { refresh };
};
