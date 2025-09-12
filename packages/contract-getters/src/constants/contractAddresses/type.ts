type B3TRGovernorLibraries = {
    governorClockLogicAddress: string;
    governorConfiguratorAddress: string;
    governorDepositLogicAddress: string;
    governorFunctionRestrictionsLogicAddress: string;
    governorProposalLogicAddressAddress: string;
    governorQuorumLogicAddress: string;
    governorStateLogicAddress: string;
    governorVotesLogicAddress: string;
};

type PassportLibraries = {
    passportChecksLogicAddress: string;
    passportConfiguratorAddress: string;
    passportEntityLogicAddress: string;
    passportDelegationLogicAddress: string;
    passportPersonhoodLogicAddress: string;
    passportPoPScoreLogicAddress: string;
    passportSignalingLogicAddress: string;
    passportWhitelistAndBlacklistLogicAddress: string;
};

export type ContractAddressesConfig = {
    //===============INTERNAL CONTRACTS===============
    //VeBetterDAO Contracts
    b3trContractAddress: string; // B3TR
    vot3ContractAddress: string; // VOT3
    b3trGovernorAddress: string; // B3TR Governor
    timelockContractAddress: string; // Timelock
    xAllocationPoolContractAddress: string; // X Allocation Pool
    xAllocationVotingContractAddress: string; // X Allocation Voting
    emissionsContractAddress: string; // Emissions
    voterRewardsContractAddress: string; // Voter Rewards
    galaxyMemberContractAddress: string; // Galaxy Member
    treasuryContractAddress: string; // Treasury
    x2EarnAppsContractAddress: string; // X2Earn Apps
    x2EarnCreatorContractAddress: string; // X2Earn Creator
    x2EarnRewardsPoolContractAddress: string; // X2Earn Rewards Pool
    tokenAuctionContractAddress: string; // Token Auction
    nodeManagementContractAddress: string; // Node Management
    veBetterPassportContractAddress: string; // VeBetter Passport
    b3trGovernorLibraries: B3TRGovernorLibraries; // B3TR Governor Libraries
    passportLibraries: PassportLibraries; // Passport Libraries
    b3trMultiSigAddress?: string; // B3TR MultiSig //TODO: Do we need this?
    stargateNFTContractAddress: string; // Stargate NFT
    grantsManagerContractAddress: string; // Grants Manager

    //===============EXTERNAL CONTRACTS===============

    //VeDelegate Contracts
    veDelegateContractAddress: string; // VeDelegate main Contract
    veDelegateVotesContractAddress: string; // VeDelegate Votes Contract
    veDelegateTokenContractAddress: string; // VeDelegate Token Contract

    //VetDomains Contracts
    vetDomainsContractAddress: string;
    vetDomainsPublicResolverAddress: string;
    vetDomainsReverseRegistrarAddress: string;
    vnsResolverAddress: string;
    vetDomainAvatarUrl: string;
};
