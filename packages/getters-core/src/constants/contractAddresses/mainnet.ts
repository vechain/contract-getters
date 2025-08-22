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
        governorClockLogicAddress: '0xed6137b125bc40834fa06e800c5a72013ef9d91c',
        governorConfiguratorAddress:
            '0xc2428c4608f97d21034ae32f104587c9c045a8a2',
        governorDepositLogicAddress:
            '0x00f1cf9847b149e594c23a15db0976a2ae0b49b2',
        governorFunctionRestrictionsLogicAddress:
            '0x1a430095eed7f87f5b41a3025c1463f68bbc2a1e',
        governorProposalLogicAddressAddress:
            '0xe37a44f0ec996ef8618e083d9d7406db1ccc395d',
        governorQuorumLogicAddress:
            '0xfbb42dc5e87105a270cab3422cc3e3b51b8af152',
        governorStateLogicAddress: '0x38e4cfebcc414902d2846b699224b26a10144ff1',
        governorVotesLogicAddress: '0x5d340fa12d11a4bab44ce8c907380a47226ef44c',
    }, // B3TR Governor Libraries
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
    b3trMultiSigAddress: '0x4Dd13fcb7b4f7DC19048ce0d23aAEbbDB3f3a1d9', // B3TR MultiSig //TODO: Do we need this?
    stargateNFTContractAddress: '0x1856c533ac2d94340aaa8544d35a5c1d4a21dee7', // Stargate NFT
    grantsManagerContractAddress: '0x055d20914657834c914d7c44bf65b566ab4b45a2', // Grants Manager

    //===============EXTERNAL CONTRACTS===============

    //VeDelegate Contracts
    veDelegateContractAddress: '0x0000000000000000000000000000000000000000', // VeDelegate main Contract
    veDelegateVotesContractAddress:
        '0x0000000000000000000000000000000000000000', // VeDelegate Votes Contract
    veDelegateTokenContractAddress:
        '0x0000000000000000000000000000000000000000', // VeDelegate Token Contract
};
export default mainnetAddresses;
