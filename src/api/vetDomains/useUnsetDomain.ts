import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
    UseSendTransactionReturnValue,
    useSendTransaction,
} from '@thor/transactions';
import { useWallet } from '@api/wallet'
import { IReverseRegistrar__factory } from '@contracts';
import { getConfig } from '@config';
import { humanAddress } from '@utils';
import { invalidateAndRefetchDomainQueries } from './utils/domainQueryUtils';
import {NETWORK_TYPE} from "@config/network";
import { ThorClient } from '@vechain/sdk-network';

type useUnsetDomainProps = {
    thor: ThorClient;
    networkType: NETWORK_TYPE;
    onSuccess?: () => void;
    onError?: () => void;
};

type useUnsetDomainReturnValue = {
    sendTransaction: () => Promise<void>;
} & Omit<UseSendTransactionReturnValue, 'sendTransaction'>;

const ReverseRegistrarInterface = IReverseRegistrar__factory.createInterface();

/**
 * Hook for unsetting any domain name (both .veworld.vet and .vet domains)
 *
 * This hook is a dedicated implementation for the unset functionality
 * that was previously part of the claim hooks.
 */
export const useUnsetDomain = ({
    thor,
    networkType,
    onSuccess,
    onError,
}: useUnsetDomainProps): useUnsetDomainReturnValue => {
    const queryClient = useQueryClient();
    const { account } = useWallet({ thor, networkType });

    const buildClauses = useCallback(async () => {
        const clausesArray: any[] = [];

        // When unsetting domain, we only need to call setName with an empty string
        clausesArray.push({
            to: getConfig(networkType).vetDomainsReverseRegistrarAddress,
            value: '0x0',
            data: ReverseRegistrarInterface.encodeFunctionData('setName', ['']),
            comment: `Unsetting your current VeChain nickname of the account ${humanAddress(
                account?.address ?? '',
                4,
                4,
            )}`,
            abi: ReverseRegistrarInterface.getFunction('setName'),
        });

        return clausesArray;
    }, [account?.address, networkType]);

    // Refetch queries to update UI after the tx is confirmed
    const handleOnSuccess = useCallback(async () => {
        const address = account?.address ?? '';

        // Invalidate all domain-related queries
        await invalidateAndRefetchDomainQueries(
            queryClient,
            address,
            '', // No domain being set
            '', // No subdomain
            '', // No full domain
            networkType,
        );

        onSuccess?.();
    }, [onSuccess, queryClient, account, networkType]);

    const result = useSendTransaction({
        thor,
        signerAccountAddress: account?.address ?? '',
        privyUIOptions: {
            title: 'Sign to unset your VeChain nickname',
            description: 'Unset your current VeChain nickname',
            buttonText: 'Sign to continue',
        },
        onTxConfirmed: handleOnSuccess,
        onTxFailedOrCancelled: onError,
        networkType
    });

    return {
        ...result,
        sendTransaction: async () => {
            return result.sendTransaction(await buildClauses());
        },
    };
};
