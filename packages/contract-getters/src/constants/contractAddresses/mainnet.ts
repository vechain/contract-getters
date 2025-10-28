import { ContractAddressesConfig } from './type';

const mainnetAddresses: ContractAddressesConfig = {
    //===============INTERNAL CONTRACTS===============
    //VeBetterDAO Contracts
    b3trContractAddress: '0x5ef79995FE8a89e0812330E4378eB2660ceDe699', // B3TR
    vot3ContractAddress: '0x76Ca782B59C74d088C7D2Cce2f211BC00836c602', // VOT3
    b3trGovernorAddress: '0x1c65C25fABe2fc1bCb82f253fA0C916a322f777C', // B3TR Governor
    timelockContractAddress: '0x7B7EaF620d88E38782c6491D7Ce0B8D8cF3227e4', // Timelock
    xAllocationPoolContractAddress:
        '0x4191776F05f4bE4848d3f4d587345078B439C7d3', // X Allocation Pool
    xAllocationVotingContractAddress:
        '0x89A00Bb0947a30FF95BEeF77a66AEdE3842Fe5B7', // X Allocation Voting
    emissionsContractAddress: '0xDf94739bd169C84fe6478D8420Bb807F1f47b135', // Emissions
    voterRewardsContractAddress: '0x838A33AF756a6366f93e201423E1425f67eC0Fa7', // Voter Rewards
    galaxyMemberContractAddress: '0x93B8cD34A7Fc4f53271b9011161F7A2B5fEA9D1F', // Galaxy Member
    treasuryContractAddress: '0xD5903BCc66e439c753e525F8AF2FeC7be2429593', // Treasury
    x2EarnAppsContractAddress: '0x8392B7CCc763dB03b47afcD8E8f5e24F9cf0554D', // X2Earn Apps
    x2EarnCreatorContractAddress: '0xe8e96a768ffd00417d4bd985bec9EcfC6F732a7f', // X2Earn Creator
    x2EarnRewardsPoolContractAddress:
        '0x6Bee7DDab6c99d5B2Af0554EaEA484CE18F52631', // X2Earn Rewards Pool
    tokenAuctionContractAddress: '0xb81E9C5f9644Dec9e5e3Cac86b4461A222072302', // Token Auction
    nodeManagementContractAddress: '0xB0EF9D89C6b49CbA6BBF86Bf2FDf0Eee4968c6AB', // Node Management
    veBetterPassportContractAddress:
        '0x35a267671d8EDD607B2056A9a13E7ba7CF53c8b3', // VeBetter Passport
    b3trGovernorLibraries: {
        governorClockLogicAddress: '0xaa5621bfa33b3166c7ffb0a846e4eeeb5289218e',
        governorConfiguratorAddress:
            '0xc9528bd01d22eb049086ac5b877b6a3748c33a1f',
        governorDepositLogicAddress:
            '0xecdcdba1b77cdffc64a5b9083f38e2b2cecd6586',
        governorFunctionRestrictionsLogicAddress:
            '0x1b7db0055dd153b3e4dd2c9eb900fcab28ea0072',
        governorProposalLogicAddressAddress:
            '0x939d3ae052a6632895c02704e93cb766205ef2b8',
        governorQuorumLogicAddress:
            '0xf85f6d18d9f49a897172c6d2c4ff201206b3d896',
        governorStateLogicAddress: '0x04c3a64ce6c36c0a087dcd3b73ea7525a617ef5e',
        governorVotesLogicAddress: '0x4c277a44faf0d657b3761206dbe7011f51153e3c',
    },
    passportLibraries: {
        passportChecksLogicAddress:
            '0xDB5b259E4BfbfD8353cfcea695bbB583eE58F77a',
        passportConfiguratorAddress:
            '0xCb35e190BecE6ED3BE22Ad911C511Ae2a751e3AC',
        passportEntityLogicAddress:
            '0x04f3a1e567dCC2a53eB9Fd07f6E42f69e4Ac372a',
        passportDelegationLogicAddress:
            '0x1dB402a8DDf4b804aF183340C93E3CD32D97546d',
        passportPersonhoodLogicAddress:
            '0xF631c28c10530f2C6CD67b3Fe0ae349D55afF4F3',
        passportPoPScoreLogicAddress:
            '0x92bccB35f911C89350e4D67fBBA8381290961981',
        passportSignalingLogicAddress:
            '0x5EcD3ec6fe7105Cc51FECa599862C318Cd276aa6',
        passportWhitelistAndBlacklistLogicAddress:
            '0x2D326f99e4251436F03eaab8b1af6875D984fD84',
    }, // Passport Libraries
    xAllocationVotingLibraries: {
        autoVotingLogicAddress: '0x5584e3aab6a24e66959147ce3eee3b1698294a9b',
    },
    b3trMultiSigAddress: '0x4Dd13fcb7b4f7DC19048ce0d23aAEbbDB3f3a1d9', // B3TR MultiSig //TODO: Do we need this?
    stargateNFTContractAddress: '0x1856c533ac2d94340aaa8544d35a5c1d4a21dee7', // Stargate NFT
    grantsManagerContractAddress: '0x055d20914657834c914d7c44bf65b566ab4b45a2', // Grants Manager
    relayerRewardsPoolContractAddress:
        '0x34b56f892c9e977b9ba2e43ba64c27d368ab3c86', // Relayer Rewards Pool
    dbaPoolContractAddress: '0x98c1d097c39969bb5de754266f60d22bd105b368',

    //===============EXTERNAL CONTRACTS===============

    //VeDelegate Contracts
    veDelegateContractAddress: '0x0000000000000000000000000000000000000000', // VeDelegate main Contract
    veDelegateVotesContractAddress:
        '0x0000000000000000000000000000000000000000', // VeDelegate Votes Contract
    veDelegateTokenContractAddress:
        '0x0000000000000000000000000000000000000000', // VeDelegate Token Contract

    //VetDomains Contracts
    vetDomainsContractAddress: '0xa9231da8BF8D10e2df3f6E03Dd5449caD600129b',
    vetDomainsPublicResolverAddress:
        '0xabac49445584C8b6c1472b030B1076Ac3901D7cf',
    vetDomainsReverseRegistrarAddress:
        '0x5c970901a587BA3932C835D4ae5FAE2BEa7e78Bc',
    vnsResolverAddress: '0xA11413086e163e41901bb81fdc5617c975Fa5a1A',
    vetDomainAvatarUrl: 'https://vet.domains/api/avatar',
};
export default mainnetAddresses;
