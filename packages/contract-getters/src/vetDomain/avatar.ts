import { isAddress, namehash, ZeroAddress } from 'ethers';

import { VeChainClient } from '../client';
import { getOrCreateClient } from '../client/utils';
import { GetterOptions } from '../types/common';
import { convertUrlToBase64, parseAvatarRecord } from '../utils';
import { VetDomainsRegistry__factory } from '@vechain/vechain-contract-types/factories/b32/ABIs/VetDomainsRegistry__factory';
import { VetDomainsPublicResolver__factory } from '@vechain/vechain-contract-types/factories/b32/ABIs/VetDomainsPublicResolver__factory';
/**
 * Get avatar for a VET domain
 * @param domain - The VET domain name to get avatar for
 * @param options - Optional client and network configuration
 * @returns Promise<string | null> - The avatar URL or null if not found
 */
export const getAvatar = async (
    domain: string,
    options?: GetterOptions,
): Promise<string | null> => {
    if (!domain) return null;
    if (isAddress(domain)) {
        throw new Error('getAvatar expects a domain name, not an address');
    }

    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    try {
        // Get avatar record from contract
        const avatarRecord = await fetchAvatarFromContract(
            domain,
            enhancedClient,
        );

        if (!avatarRecord) return null;

        // Parse the avatar record and return ready-to-use data
        const parsedAvatar = await parseAvatarRecord(
            avatarRecord,
            enhancedClient,
        );

        // If it's a direct URL, convert to base64 for consistency
        if (parsedAvatar && parsedAvatar.startsWith('http')) {
            return await convertUrlToBase64(parsedAvatar);
        }

        return parsedAvatar;
    } catch (error) {
        console.error('Error fetching avatar:', error);
        return null;
    }
};

// Fetch avatar from contract
const fetchAvatarFromContract = async (
    _domain: string,
    _enhancedClient: VeChainClient,
): Promise<string | null> => {
    // Get resolver address
    const node = namehash(_domain) as `0x${string}`;
    const resolverAddressTxResult = await _enhancedClient.contracts
        .load(
            _enhancedClient.contractAddresses.vetDomainsContractAddress,
            VetDomainsRegistry__factory.abi,
        )
        .read.resolver(node);

    const resolverAddress = resolverAddressTxResult[0];

    if (!resolverAddress || resolverAddress === ZeroAddress) return null;

    const avatarTxResult = await _enhancedClient.contracts
        .load(resolverAddress, VetDomainsPublicResolver__factory.abi)
        .read.text(node, 'avatar');

    return avatarTxResult[0] || null;
};
