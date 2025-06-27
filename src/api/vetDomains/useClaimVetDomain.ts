import { useCallback } from 'react';
import { UseSendTransactionReturnValue, useSendTransaction } from '@thor/transactions';
import { useWallet, useRefreshMetadata } from '@api/wallet';
import { IReverseRegistrar__factory } from '@contracts';
import { useQueryClient } from '@tanstack/react-query';
import { getConfig } from '@/config';
import { ethers } from 'ethers';
import { invalidateAndRefetchDomainQueries } from './utils/domainQueryUtils';
import { humanAddress } from '@/utils';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from '@vechain/sdk-network';

type useClaimVetDomainProps = {
    thor: ThorClient;
    networkType: NETWORK_TYPE;
    domain: string;
    onSuccess?: () => void;
    onError?: () => void;
    onSuccessMessageTitle?: number;
    alreadyOwned?: boolean;
};

type useClaimVetDomainReturnValue = {
    sendTransaction: () => Promise<void>;
} & Omit<UseSendTransactionReturnValue, 'sendTransaction'>;

const ReverseRegistrarInterface = IReverseRegistrar__factory.createInterface();

/**
 * Hook for claiming a .vet domain
 *
 * This hook specializes in handling primary .vet domains
 */
export const useClaimVetDomain = ({
    thor,
    networkType,
    domain,
    onSuccess,
    onError,
    alreadyOwned = false,
}: useClaimVetDomainProps): useClaimVetDomainReturnValue => {
    const queryClient = useQueryClient();
    const { account } = useWallet({ thor, networkType });
    const { refresh: refreshMetadata } = useRefreshMetadata(
        networkType,
        domain,
        account?.address ?? '',
    );

    const buildClauses = useCallback(async () => {
        const clausesArray: any[] = [];

        if (!domain) throw new Error('Invalid domain');

        if (alreadyOwned) {
            // For already owned domains, set the name in the reverse registrar
            clausesArray.push({
                to: getConfig(networkType).vetDomainsReverseRegistrarAddress,
                value: '0x0',
                data: ReverseRegistrarInterface.encodeFunctionData('setName', [
                    domain,
                ]),
                comment: `Setting your VeChain nickname to ${domain}`,
                abi: ReverseRegistrarInterface.getFunction('setName'),
            });

            // Also set the address in the public resolver
            const PublicResolverInterface = new ethers.Interface([
                'function setAddr(bytes32 node, address addr)',
            ]);

            // Calculate the namehash for the domain
            const domainNode = ethers.namehash(domain);

            clausesArray.push({
                to: getConfig(networkType).vetDomainsPublicResolverAddress,
                value: '0x0',
                data: PublicResolverInterface.encodeFunctionData('setAddr', [
                    domainNode,
                    account?.address || '',
                ]),
                comment: `Setting the address for ${domain} to ${humanAddress(
                    account?.address ?? '',
                    4,
                    4,
                )}`,
                abi: PublicResolverInterface.getFunction('setAddr'),
            });
        } else {
            throw new Error('Primary .vet domains are not supported yet');
            // // For domains that need to be claimed
            // const ETHRegistrarControllerInterface = new ethers.Interface([
            //     'function registerWithConfig(string name, address owner, uint32 duration, bytes32 secret, address resolver, address addr)',
            // ]);

            // // For new domains, claim the domain
            // clausesArray.push({
            //     to: getConfig(networkType).vetDomainsContractAddress,
            //     value: '0x0',
            //     data: ETHRegistrarControllerInterface.encodeFunctionData(
            //         'registerWithConfig',
            //         [
            //             // Strip .vet if present
            //             domain.replace('.vet', ''),
            //             account?.address || '',
            //             365 * 24 * 60 * 60, // 1 year in seconds
            //             ethers.zeroPadValue('0x', 32), // empty secret
            //             getConfig(networkType).vetDomainsPublicResolverAddress,
            //             account?.address || '',
            //         ],
            //     ),
            //     comment: `Claiming the VeChain domain: ${domain}`,
            //     abi: ETHRegistrarControllerInterface.getFunction(
            //         'registerWithConfig',
            //     ),
            // });

            // clausesArray.push({
            //     to: getConfig(networkType).vetDomainsReverseRegistrarAddress,
            //     value: '0x0',
            //     data: ReverseRegistrarInterface.encodeFunctionData('setName', [
            //         domain,
            //     ]),
            //     comment: `Setting ${domain} as the VeChain nickname of the account ${humanAddress(
            //         account?.address ?? '',
            //         4,
            //         4,
            //     )}`,
            //     abi: ReverseRegistrarInterface.getFunction('setName'),
            // });
        }

        return clausesArray;
    }, [domain, alreadyOwned, account?.address, networkType]);

    // Refetch queries to update UI after the tx is confirmed
    const handleOnSuccess = useCallback(async () => {
        const address = account?.address ?? '';

        await invalidateAndRefetchDomainQueries(
            queryClient,
            address,
            domain,
            '', // No subdomain for primary domains
            domain.endsWith('.vet') ? domain : `${domain}.vet`,
            networkType,
        );

        // Use the dedicated metadata refresh utility
        refreshMetadata();

        onSuccess?.();
    }, [
        onSuccess,
        domain,
        queryClient,
        account,
        networkType,
        refreshMetadata,
    ]);

    const result = useSendTransaction({
        thor,
        signerAccountAddress: account?.address ?? '',
        privyUIOptions: {
            title: 'Sign to claim your VeChain nickname',
            description: `Claim ${domain} as your VeChain nickname`,
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
