import { VeBetterPassport__factory } from '@vechain/vebetterdao-contracts';

import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';

/**
 * Check if an address is a person in the VeBetterPassport contract
 * @param user - The user address to check
 * @param options - Optional client and network configuration
 * @returns Promise<boolean> - Whether the address is a person
 */
export const getIsPerson = async (
    user: string,
    options?: GetterOptions,
): Promise<boolean> => {
    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    const result: readonly [boolean, string] = await enhancedClient.contracts
        .load(
            enhancedClient.contractAddresses.veBetterPassportContractAddress,
            VeBetterPassport__factory.abi,
        )
        .read.isPerson(user);

    return result[0];
};
