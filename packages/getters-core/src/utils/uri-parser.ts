import IERC1155MetadataURIABI from '@openzeppelin/contracts/build/contracts/IERC1155MetadataURI.json';
import IERC721MetadataABI from '@openzeppelin/contracts/build/contracts/IERC721Metadata.json';
import { Interface, toBeHex, zeroPadValue } from 'ethers';

import { VeChainClient } from '../client';

// Create interfaces using OpenZeppelin ABIs
export const erc721Interface = new Interface(IERC721MetadataABI.abi);
export const erc1155Interface = new Interface(IERC1155MetadataURIABI.abi);

/**
 * Parse avatar record and return ready-to-use data URL
 * @param record - The avatar record string from the contract
 * @param enhancedClient - The VeChain enhanced client for making contract calls
 * @returns Promise<string | null> - Parsed avatar URL or null
 */
export async function parseAvatarRecord(
    record: string,
    enhancedClient: VeChainClient,
): Promise<string | null> {
    try {
        // Use the existing URI converter for direct URL handling
        if (
            record.startsWith('http') ||
            record.startsWith('ipfs://') ||
            record.startsWith('ar://')
        ) {
            return convertUriToUrl(record) || null;
        }

        // Handle NFT avatar (ENS-12)
        const match = record.match(
            /eip155:(\d+)\/(?:erc721|erc1155):([^/]+)\/(\d+)/,
        );
        if (match) {
            const [, chainId, contractAddress, tokenId] = match;
            const isErc1155 = record.includes('erc1155');

            if (!chainId || !contractAddress || tokenId === undefined) {
                return null;
            }

            // Use enhanced client to make contract call
            let tokenUri = '';
            try {
                if (isErc1155) {
                    const contract = enhancedClient.contracts.load(
                        contractAddress,
                        IERC1155MetadataURIABI.abi as any,
                    );
                    const result = await contract.read.uri(
                        BigInt(tokenId || 0),
                    );
                    tokenUri = result[0];
                } else {
                    const contract = enhancedClient.contracts.load(
                        contractAddress,
                        IERC721MetadataABI.abi as any,
                    );
                    const result = await contract.read.tokenURI(
                        BigInt(tokenId || 0),
                    );
                    tokenUri = result[0];
                }
            } catch (e) {
                console.error('Failed to fetch tokenURI/uri from contract:', e);
                return null;
            }

            // Use the existing URI converter
            tokenUri = convertUriToUrl(tokenUri) || tokenUri;

            if (isErc1155) {
                tokenUri = tokenUri.replace(
                    '{id}',
                    zeroPadValue(toBeHex(BigInt(tokenId || 0)), 32).slice(2),
                );
            }

            const metadataResponse = await fetch(tokenUri);
            if (!metadataResponse.ok) {
                console.error('Failed to fetch metadata');
                return null;
            }

            const metadata = await metadataResponse.json();
            const imageUrl =
                metadata.image || metadata.image_url || metadata.image_data;

            if (!imageUrl) {
                console.error('No image URL in metadata');
                return null;
            }

            // Use the existing URI converter for the final image URL
            const finalImageUrl = convertUriToUrl(imageUrl) || imageUrl;

            // Convert to base64 if it's a URL
            if (finalImageUrl.startsWith('http')) {
                return await convertUrlToBase64(finalImageUrl);
            }

            return finalImageUrl;
        }

        return null;
    } catch (error) {
        console.error('Error parsing avatar record:', error);
        return null;
    }
}

/**
 * Convert various URI protocols to HTTP URLs
 * @param uri - The URI to convert (supports ipfs://, ar://, data:, http://, https://)
 * @returns string | null - The converted URL or null if invalid
 */
export const convertUriToUrl = (uri: string): string | null => {
    // if it is a data uri just return it
    if (uri.startsWith('data:')) return uri;

    const splitUri = uri?.split('://');
    if (splitUri.length !== 2) return null;

    const protocol = splitUri?.[0]?.trim();
    const uriWithoutProtocol = splitUri[1];

    switch (protocol) {
        case 'ipfs':
            if (!validateIpfsUri(uri))
                throw new Error(`Invalid IPFS URI ${uri}`);

            return `https://api.gateway-proxy.vechain.org/ipfs/${uriWithoutProtocol}`;

        case 'ar':
            return `https://arweave.net/${uriWithoutProtocol}`;

        default:
            return uri;
    }
};

/**
 * Convert URL to base64 data URL (works in both Node.js and browser)
 * @param url - The URL to convert
 * @returns Promise<string | null> - Base64 data URL or null if failed
 */
export const convertUrlToBase64 = async (
    url: string,
): Promise<string | null> => {
    try {
        const response = await fetch(url);
        if (!response.ok) return null;

        const blob = await response.blob();

        // Node.js environment
        if (typeof window === 'undefined') {
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const contentType = blob.type || 'application/octet-stream';
            return `data:${contentType};base64,${buffer.toString('base64')}`;
        }

        // Browser environment
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result as string);
        });
    } catch (error) {
        console.error('Error converting URL to base64:', error);
        return null;
    }
};

/**
 * Validate IPFS URI format
 * @param uri - The IPFS URI to validate
 * @returns boolean - True if valid IPFS URI
 */
export const validateIpfsUri = (uri: string): boolean => {
    const trimmedUri = uri.trim();
    return /^ipfs:\/\/[a-zA-Z0-9]+(\/[^/]+)*\/?$/.test(trimmedUri);
};
