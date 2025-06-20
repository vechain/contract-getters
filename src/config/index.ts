import type { Network } from './network';
import { NETWORK_TYPE } from './network';
import mainnetConfig from './mainnet';
import testnetConfig from './testnet';
import soloConfig from './solo';

export type AppConfig = {
    ipfsFetchingService: string;
    ipfsPinningService: string;
    vthoContractAddress: string;
    b3trContractAddress: string;
    vot3ContractAddress: string;
    b3trGovernorAddress: string;
    timelockContractAddress: string;
    xAllocationPoolContractAddress: string;
    xAllocationVotingContractAddress: string;
    emissionsContractAddress: string;
    voterRewardsContractAddress: string;
    galaxyMemberContractAddress: string;
    treasuryContractAddress: string;
    x2EarnAppsContractAddress: string;
    x2EarnRewardsPoolContractAddress: string;
    nodeManagementContractAddress: string;
    veBetterPassportContractAddress: string;
    x2EarnCreatorContractAddress: string;
    veDelegate: string;
    veDelegateVotes: string;
    veDelegateTokenContractAddress: string;
    oracleContractAddress: string;
    accountFactoryAddress: string;
    cleanifyCampaignsContractAddress: string;
    cleanifyChallengesContractAddress: string;
    veWorldSubdomainClaimerContractAddress: string;
    vetDomainsContractAddress: string;
    vetDomainsPublicResolverAddress: string;
    vetDomainsReverseRegistrarAddress: string;
    vnsResolverAddress: string;
    gloDollarContractAddress: string;
    vetDomainAvatarUrl: string;
    indexerUrl: string;
    b3trIndexerUrl: string;
    graphQlIndexerUrl: string;
    nodeUrl: string;
    network: Network;
    explorerUrl: string;
};

export const getConfig = (type: NETWORK_TYPE): AppConfig => {
    switch (type) {
        case 'main':
            return mainnetConfig;
        case 'test':
            return testnetConfig;
        case 'solo':
            return soloConfig;
        default:
            throw new Error(`Unsupported network type: ${type}`);
    }
};