import { NETWORK_TYPE } from '@config/network';
import {
    useVechainDomain,
    useGetTextRecords,
    useGetAvatarOfAddress,
} from '@api/vetDomains';
import { convertUriToUrl } from '@utils';
import { ENSRecords } from '@types';
import { ThorClient } from "@vechain/sdk-network";

export const useWalletMetadata = (
    address: string,
    thor: ThorClient,
    networkType: NETWORK_TYPE,
) => {
    const { data: domain, isLoading: isLoadingVechainDomain } =
        useVechainDomain(thor, networkType, address ?? '');
    const { data: avatar, isLoading: isLoadingMetadata } =
        useGetAvatarOfAddress(thor, networkType, address ?? '');
    const { data: textRecords, isLoading: isLoadingRecords } =
        useGetTextRecords({ type: networkType }, domain?.domain ?? '');
    const headerUrl = textRecords?.header
        ? convertUriToUrl(textRecords.header, networkType)
        : null;

    return {
        domain: domain?.domain,
        image: avatar,
        records: {
            ...textRecords,
            header: headerUrl,
        } as ENSRecords,
        isLoading:
            isLoadingVechainDomain || isLoadingMetadata || isLoadingRecords,
    };
};
