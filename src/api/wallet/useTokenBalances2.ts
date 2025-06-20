import { formatEther } from 'ethers';
import { useQueries } from '@tanstack/react-query';
import { useThor } from '@vechain/dapp-kit-react';
import { ThorClient } from '@vechain/sdk-network';
import { getConfig } from '@config';
import { useCustomTokens } from '@api/wallet';
import { CustomTokenInfo } from '@thor/contracts/ERC20'
import { getAccountBalance } from '@thor/accounts';
import { executeMultipleClausesCall } from '@utils';
import { NETWORK_TYPE } from '@config/network';
import { IB3TR__factory, IERC20__factory, IVOT3__factory } from '@contracts';

type UseTokenBalancesProps = {
    networkType: NETWORK_TYPE;
    address: string;
};

const getCustomTokenBalances = async (
    thor: ThorClient,
    address: string,
    customTokens: CustomTokenInfo[],
) => {
    const clauses = customTokens.map((token) => {
        const erc20Contract = thor.contracts.load(
            token.address,
            IERC20__factory.abi,
        );
        return erc20Contract.clause.balanceOf([address]);
    });

    const response = await thor.contracts.executeMultipleClausesCall(clauses);

    if (!response.every((r) => r.success && !!r.result.plain)) {
        throw new Error('Failed to get custom token balances');
    }

    return response.map((r, index) => {
        const token = customTokens[index];
        const original = r.result.plain as string;
        const scaled = formatEther(BigInt(original)) || '0';

        return {
            address: token.address,
            symbol: token.symbol,
            balance: scaled,
        };
    });
};

const getTokenBalances = async (
    thor: ThorClient,
    address: string,
    network: NETWORK_TYPE,
) => {
    const config = getConfig(network);

    const [b3trBalance, vot3Balance, veDelegateBalance, gloDollarBalance] =
        await executeMultipleClausesCall({
            thor,
            calls: [
                {
                    abi: IB3TR__factory.abi,
                    address: config.b3trContractAddress as `0x${string}`,
                    functionName: 'balanceOf',
                    args: [address as `0x${string}`],
                },
                {
                    abi: IVOT3__factory.abi,
                    address: config.vot3ContractAddress as `0x${string}`,
                    functionName: 'balanceOf',
                    args: [address as `0x${string}`],
                },
                {
                    abi: IERC20__factory.abi,
                    address: config.veDelegate as `0x${string}`,
                    functionName: 'balanceOf',
                    args: [address as `0x${string}`],
                },
                {
                    abi: IERC20__factory.abi,
                    address: config.gloDollarContractAddress as `0x${string}`,
                    functionName: 'balanceOf',
                    args: [address as `0x${string}`],
                },
            ],
        });

    const { balance: vetBalance, energy: vthoBalance } =
        await getAccountBalance(thor, address);

    return [
        {
            address: '0x',
            symbol: 'VET',
            balance: vetBalance,
        },
        {
            address: config.vthoContractAddress,
            symbol: 'VTHO',
            balance: vthoBalance,
        },
        {
            address: config.b3trContractAddress,
            symbol: 'B3TR',
            balance: b3trBalance,
        },
        {
            address: config.vot3ContractAddress,
            symbol: 'VOT3',
            balance: vot3Balance,
        },
        {
            address: config.veDelegate,
            symbol: 'veDelegate',
            balance: veDelegateBalance,
        },
        {
            address: config.gloDollarContractAddress,
            symbol: 'USDGLO',
            balance: gloDollarBalance,
        },
    ];
};

export const useTokenBalances2 = ({
    networkType,
    address
}: UseTokenBalancesProps) => {
    const thor = useThor();
    const { customTokens } = useCustomTokens(networkType);

    return useQueries({
        queries: [
            {
                queryKey: ['base-token-balances', address],
                queryFn: () => getTokenBalances(thor, address, networkType),
            },
            {
                queryKey: ['custom-token-balances', address],
                queryFn: () =>
                    getCustomTokenBalances(thor, address, customTokens),
            },
        ],
        combine: (data) => {
            return {
                data: data.flat(),
                loading: data[0].isLoading || data[1].isLoading,
                error: data[0].error || data[1].error,
            };
        },
    });
};
