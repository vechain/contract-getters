import { getConfig } from '@/config';
import { NetworkConfig } from "@types";

export const useGetNodeUrl = (network: NetworkConfig) => {
    // If user has set a nodeUrl, use it, otherwise use the default nodeUrl for the network
    return network.nodeUrl ?? getConfig(network.type).nodeUrl;
};
