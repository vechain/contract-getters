import { isAddress, ZeroAddress } from 'ethers';

import { getOrCreateClient } from '../client/utils';
import { VetDomainsResolveUtilities__factory } from '@vechain/vechain-contract-types/factories/b32/ABIs/VetDomainsResolveUtilities__factory';
import { GetterOptions } from '../types/common';

/**
 * Get address for a VET domain
 * @param domain - The VET domain name to get address for
 * @param options - Optional client and network configuration
 * @returns Promise<string | null> - The address or null if not found/invalid
 */
export const getDomainAddress = async (
    domain: string,
    options?: GetterOptions,
): Promise<string | null> => {
    if (!domain) return null;
    if (isAddress(domain)) {
        throw new Error(
            'getDomainAddress expects a domain name, not an address',
        );
    }

    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    try {
        const addressResult = await enhancedClient.contracts
            .load(
                enhancedClient.contractAddresses.vnsResolverAddress,
                VetDomainsResolveUtilities__factory.abi,
            )
            .read.getAddresses([domain]);

        const address = addressResult[0][0];

        // Return null if address is zero address (domain not registered or not pointing to an address)
        return address && address !== ZeroAddress ? address : null;
    } catch (error) {
        console.error('Error fetching domain address:', error);
        return null;
    }
};

/**
 * Get primary domain for an address
 * @param address - The address to get domain for
 * @param options - Optional client and network configuration
 * @returns Promise<string | null> - The primary domain or null if not found
 */
export const getAddressDomain = async (
    address: string,
    options?: GetterOptions,
): Promise<string | null> => {
    if (!address) return null;
    if (!isAddress(address)) {
        throw new Error(
            'getAddressDomain expects an address, not a domain name',
        );
    }

    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    try {
        const domainResult = await enhancedClient.contracts
            .load(
                enhancedClient.contractAddresses.vnsResolverAddress,
                VetDomainsResolveUtilities__factory.abi,
            )
            .read.getNames([address]);

        const domain = domainResult[0][0];
        return domain || null;
    } catch (error) {
        console.error('Error fetching address domain:', error);
        return null;
    }
};

/**
 * Get addresses for multiple VET domains (batch operation)
 * @param domains - Array of VET domain names to get addresses for
 * @param options - Optional client and network configuration
 * @returns Promise<(string | null)[]> - Array of addresses (null for invalid/unregistered domains)
 */
export const getDomainAddresses = async (
    domains: string[],
    options?: GetterOptions,
): Promise<(string | null)[]> => {
    if (!domains || domains.length === 0) return [];

    // Validate all inputs are domain names
    for (const domain of domains) {
        if (isAddress(domain)) {
            throw new Error(
                'getDomainAddresses expects domain names, not addresses',
            );
        }
    }

    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    try {
        const addressResults = await enhancedClient.contracts
            .load(
                enhancedClient.contractAddresses.vnsResolverAddress,
                VetDomainsResolveUtilities__factory.abi,
            )
            .read.getAddresses(domains);

        // Convert zero addresses to null
        return addressResults[0].map((address) =>
            address && address !== ZeroAddress ? address : null,
        );
    } catch (error) {
        console.error('Error fetching domain addresses:', error);
        return domains.map(() => null);
    }
};

/**
 * Get primary domains for multiple addresses (batch operation)
 * @param addresses - Array of addresses to get domains for
 * @param options - Optional client and network configuration
 * @returns Promise<(string | null)[]> - Array of primary domains (null if no domain set)
 */
export const getAddressDomains = async (
    addresses: string[],
    options?: GetterOptions,
): Promise<(string | null)[]> => {
    if (!addresses || addresses.length === 0) return [];

    // Validate all inputs are addresses
    for (const address of addresses) {
        if (!isAddress(address)) {
            throw new Error(
                'getAddressDomains expects addresses, not domain names',
            );
        }
    }

    const enhancedClient = getOrCreateClient(
        options?.client,
        options?.networkUrl,
    );

    try {
        const domainResults = await enhancedClient.contracts
            .load(
                enhancedClient.contractAddresses.vnsResolverAddress,
                VetDomainsResolveUtilities__factory.abi,
            )
            .read.getNames(addresses);

        // Convert empty strings to null
        return domainResults[0].map((domain) => domain || null);
    } catch (error) {
        console.error('Error fetching address domains:', error);
        return addresses.map(() => null);
    }
};

/**
 * Check if a domain is the primary domain for a given address
 * @param domain - The domain name to check
 * @param address - The address to check against
 * @param options - Optional client and network configuration
 * @returns Promise<boolean> - True if the domain is primary for the address
 */
export const isPrimaryDomain = async (
    domain: string,
    address: string,
    options?: GetterOptions,
): Promise<boolean> => {
    if (!domain || !address) return false;
    if (isAddress(domain)) {
        throw new Error(
            'isPrimaryDomain expects a domain name as first parameter',
        );
    }
    if (!isAddress(address)) {
        throw new Error(
            'isPrimaryDomain expects an address as second parameter',
        );
    }

    try {
        // Get the primary domain for the address
        const primaryDomain = await getAddressDomain(address, options);

        // Check if it matches the provided domain
        return primaryDomain === domain;
    } catch (error) {
        console.error('Error checking if domain is primary:', error);
        return false;
    }
};

/**
 * Validate if a domain resolves to a valid address
 * @param domain - The domain name to validate
 * @param options - Optional client and network configuration
 * @returns Promise<boolean> - True if domain resolves to a valid address
 */
export const isValidDomain = async (
    domain: string,
    options?: GetterOptions,
): Promise<boolean> => {
    if (!domain) return false;
    if (isAddress(domain)) return false; // Addresses are not domains

    try {
        const address = await getDomainAddress(domain, options);
        return address !== null;
    } catch {
        return false;
    }
};
