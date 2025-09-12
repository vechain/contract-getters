import { DEFAULT_NETWORK_URL } from './constants';
import { VeChainClient } from './VeChainClient';

export const getOrCreateClient = (
    client?: VeChainClient,
    networkUrl?: string,
) => {
    if (client) {
        return client;
    }
    return VeChainClient.create({ nodeUrl: networkUrl ?? DEFAULT_NETWORK_URL });
};
