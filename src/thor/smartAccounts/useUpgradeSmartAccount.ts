import { useCallback } from 'react';
import { SimpleAccount__factory } from '@contracts';
import {
    useSendTransaction,
    UseSendTransactionReturnValue,
    useAccountImplementationAddress,
    useRefreshFactoryQueries,
    useRefreshSmartAccountQueries,
} from '@thor';
import { humanAddress, isValidAddress } from '@utils';
import { TransactionClause } from '@vechain/sdk-core';
import { QueryClient } from "@tanstack/react-query";
import { WalletConfig } from "@api/wallet";
import { NetworkConfig } from "@types";
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

type UseUpgradeSmartAccountVersionProps = {
    thor: ThorClient;
    networkType: NETWORK_TYPE;
    smartAccountAddress: string;
    targetVersion: number;
    networkConfig: NetworkConfig;
    queryClient: QueryClient;
    walletConfig: WalletConfig;
    onSuccess?: () => void;
    onError?: () => void;
};

type UseUpgradeSmartAccountVersionReturnValue = {
    sendTransaction: () => Promise<void>;
} & Omit<UseSendTransactionReturnValue, 'sendTransaction'>;

const simpleAccountInterface = SimpleAccount__factory.createInterface();

export const useUpgradeSmartAccount = ({
    thor,
    smartAccountAddress,
    targetVersion,
    networkConfig,
    queryClient,
    walletConfig,
    onSuccess,
    onError,
    networkType
}: UseUpgradeSmartAccountVersionProps): UseUpgradeSmartAccountVersionReturnValue => {
    const { refresh: refreshFactoryQueries } = useRefreshFactoryQueries(networkConfig.type, queryClient, walletConfig);
    const { refresh: refreshSmartAccountQueries } =
        useRefreshSmartAccountQueries(queryClient, walletConfig);

    // Fetch the new implementation address for the requested version
    const { data: newImplementationAddress } =
        useAccountImplementationAddress(thor, networkConfig, targetVersion);

    const buildClauses = useCallback(async () => {
        if (!smartAccountAddress || !isValidAddress(smartAccountAddress)) {
            throw new Error('Invalid smart account address');
        }

        if (!newImplementationAddress) {
            throw new Error(
                `Unable to fetch implementation address for version ${targetVersion}`,
            );
        }

        return [
            {
                to: smartAccountAddress,
                value: '0x0',
                data: simpleAccountInterface.encodeFunctionData(
                    'upgradeToAndCall',
                    [newImplementationAddress, '0x'],
                ),
                comment: `Upgrade account to version ${targetVersion}`,
                abi: simpleAccountInterface
                    .getFunction('upgradeToAndCall')
                    .format('json'),
            },
        ] as TransactionClause[];
    }, [smartAccountAddress, newImplementationAddress, targetVersion]);

    const handleOnSuccess = async () => {
        // Refresh all relevant queries
        await Promise.all([
            refreshFactoryQueries(),
            refreshSmartAccountQueries(),
        ]);
        onSuccess?.();
    };

    const result = useSendTransaction({
        thor,
        privyUIOptions: {
            title: 'Upgrade Smart Account',
            description: `Upgrading your account at ${humanAddress(
                smartAccountAddress,
            )} to version ${targetVersion}`,
            buttonText: 'Sign to continue',
        },
        onTxConfirmed: handleOnSuccess,
        onTxFailedOrCancelled: async () => {
            onError?.();
        },
        networkType
    });

    return {
        ...result,
        sendTransaction: async () => {
            return result.sendTransaction(await buildClauses());
        },
    };
};
