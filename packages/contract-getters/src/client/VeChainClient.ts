import { BlocksModuleOptions, ThorClient } from '@vechain/sdk-network';
import { ContractAddressesConfig } from '../constants/contractAddresses/type';
import { getContractAddresses } from '../constants/contractAddresses/utils';

export interface VeChainClientOptions {
    nodeUrl: string;
    options?: BlocksModuleOptions;
    overrideAddresses?: Partial<ContractAddressesConfig>;
}

export class VeChainClient extends ThorClient {
    public readonly contractAddresses: ContractAddressesConfig;

    private constructor(
        client: ThorClient,
        overrideAddresses?: Partial<ContractAddressesConfig>,
    ) {
        super(client.httpClient);
        this.contractAddresses = getContractAddresses(this, overrideAddresses);
    }

    static create({
        nodeUrl,
        options,
        overrideAddresses,
    }: VeChainClientOptions): VeChainClient {
        return new VeChainClient(
            ThorClient.at(nodeUrl, options),
            overrideAddresses,
        );
    }

    static from(
        client: ThorClient,
        overrideAddresses?: Partial<ContractAddressesConfig>,
    ): VeChainClient {
        return new VeChainClient(client, overrideAddresses);
    }
}
