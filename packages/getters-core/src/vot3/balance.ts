import { VOT3__factory } from '@vechain/vebetterdao-contracts';
import { VeChainClient } from '../client';

export const getVot3Balance = async (
    client: VeChainClient,
    address: string,
) => {
    return await client.contracts
        .load(client.contractAddresses.vot3ContractAddress, VOT3__factory.abi)
        .read.balanceOf(address);
};
