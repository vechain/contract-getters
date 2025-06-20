export * from './types';
export * from './ensTextRecords';

import { NETWORK_TYPE } from "@config/network";

export interface NetworkConfig {
    type: NETWORK_TYPE;
    nodeUrl?: string;
    requireCertificate?: boolean;
    connectionCertificate?: {
        message?: Connex.Vendor.CertMessage;
        options?: Connex.Signer.CertOptions;
    };
}
