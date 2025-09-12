import { VeChainClient } from '../client';

/**
 * Common options for all getter functions
 */
export interface GetterOptions {
    client?: VeChainClient;
    networkUrl?: string;
}

/**
 * Utility type to extract getter options from function parameters
 */
export type GetterParams<T extends Record<string, any>> = T & GetterOptions;
