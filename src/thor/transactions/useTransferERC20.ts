import {
    UseSendTransactionReturnValue,
    useSendTransaction,
} from '@thor';
import { useRefreshBalances } from '@api/wallet'
import { useCallback } from 'react';
import { ERC20__factory } from '@contracts';
import { useQueryClient } from '@tanstack/react-query';
import { humanAddress, isValidAddress } from '@utils';
import { parseEther } from 'viem';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from '@vechain/sdk-network';

type useTransferERC20Props = {
    thor: ThorClient;
    networkType: NETWORK_TYPE;
    fromAddress: string;
    receiverAddress: string;
    amount: string;
    tokenAddress: string;
    tokenName: string;
    onSuccess?: () => void;
    onSuccessMessageTitle?: number;
    onError?: (error?: string) => void;
};

type useTransferERC20ReturnValue = {
    sendTransaction: () => Promise<void>;
} & Omit<UseSendTransactionReturnValue, 'sendTransaction'>;

const ERC20Interface = ERC20__factory.createInterface();

export const useTransferERC20 = ({
    thor,
    fromAddress,
    receiverAddress,
    amount,
    tokenAddress,
    tokenName,
    networkType,
    onSuccess,
    onError,
}: useTransferERC20Props): useTransferERC20ReturnValue => {
    const queryClient = useQueryClient();
    const { refresh } = useRefreshBalances(thor, networkType);

    const buildClauses = useCallback(async () => {
        if (!receiverAddress || !amount || !isValidAddress(receiverAddress))
            throw new Error('Invalid receiver address or amount');

        const clausesArray: any[] = [];

        clausesArray.push({
            to: tokenAddress,
            value: '0x0',
            data: ERC20Interface.encodeFunctionData('transfer', [
                receiverAddress,
                parseEther(amount),
            ]),
            comment: `Transfer ${amount} ${tokenName} to ${receiverAddress}`,
            abi: ERC20Interface.getFunction('transfer'),
        });

        return clausesArray;
    }, [receiverAddress, amount]);

    //Refetch queries to update ui after the tx is confirmed
    const handleOnSuccess = useCallback(async () => {
        refresh();
        onSuccess?.();
    }, [onSuccess, fromAddress, queryClient]);

    const result = useSendTransaction({
        thor,
        signerAccountAddress: fromAddress,
        privyUIOptions: {
            title: 'Confirm Transfer',
            description: `Transfer ${amount} ${tokenName} to ${humanAddress(
                receiverAddress,
            )}`,
            buttonText: 'Sign to continue',
        },
        onTxConfirmed: handleOnSuccess,
        onTxFailedOrCancelled: async (error) => {
            onError?.(error instanceof Error ? error.message : String(error));
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
