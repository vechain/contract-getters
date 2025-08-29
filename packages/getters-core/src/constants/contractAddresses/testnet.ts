import { ContractAddressesConfig } from './type';

const testnetAddresses: ContractAddressesConfig = {
    //===============INTERNAL CONTRACTS===============
    //VeBetterDAO Contracts
    b3trContractAddress: '0xbf64cf86894Ee0877C4e7d03936e35Ee8D8b864F', // B3TR
    vot3ContractAddress: '0xa704c45971995467696EE9544Da77DD42Bc9706E', // VOT3
    b3trGovernorAddress: '0xDF5E114D391CAC840529802fe8D01f6bdeBE41eC', // B3TR Governor
    timelockContractAddress: '0x30ee94F303643902a68aD8A7A6456cA69d763192', // Timelock
    xAllocationPoolContractAddress:
        '0x9B9CA9D0C41Add1d204f90BA0E9a6844f1843A84', // X Allocation Pool
    xAllocationVotingContractAddress:
        '0x5859ff910d8b0c127364c98E24233b0af7443c1c', // X Allocation Voting
    emissionsContractAddress: '0x3D7616213191a10460e49CfdB7edBf88D6a10942', // Emissions
    voterRewardsContractAddress: '0x2E47fc4aabB3403037fB5E1f38995E7a91Ce8Ed2', // Voter Rewards
    galaxyMemberContractAddress: '0xa9aC49C030c1148b95F056E86f2531f8F3d5bf27', // Galaxy Member
    treasuryContractAddress: '0x039893EBe092A2D22B08E2b029735D211bfF7F50', // Treasury
    x2EarnAppsContractAddress: '0xcB23Eb1bBD5c07553795b9538b1061D0f4ABA153', // X2Earn Apps
    x2EarnCreatorContractAddress: '', // X2Earn Creator
    x2EarnRewardsPoolContractAddress:
        '0x5F8f86B8D0Fa93cdaE20936d150175dF0205fB38', // X2Earn Rewards Pool
    tokenAuctionContractAddress: '', // Token Auction
    nodeManagementContractAddress: '', // Node Management
    veBetterPassportContractAddress:
        '0x63c061a2753e84635a22ff05954e1687f104f002', // VeBetter Passport
    b3trGovernorLibraries: {
        governorClockLogicAddress: '0x4104385CDA4be4eed954E47CeeB261Df50EFcA63',
        governorConfiguratorAddress:
            '0x2E096fA388Ed7dFE4209bc7aB2d577DB73aB6D61',
        governorDepositLogicAddress:
            '0x207769d88579066211a55F7CbB9f727a2B907E5C',
        governorFunctionRestrictionsLogicAddress:
            '0xB344b0D08Bc7f458BA4c5C5436b2BeE1bc1a9496',
        governorProposalLogicAddressAddress:
            '0xEbb62a3a1b38B8e42d88CE40dc89dfAfB5ab51FB',
        governorQuorumLogicAddress:
            '0x5F18ad4dCFb536fb1e4432249A8314788Af21b6A',
        governorStateLogicAddress: '0xAB952E5a5de8B7a00CFb4ad20C805A0d05eDeA30',
        governorVotesLogicAddress: '0xcf04A7454C729B15C2E22168A7ad298076f9a1D8',
    }, // B3TR Governor Libraries
    passportLibraries: {
        passportChecksLogicAddress:
            '0xEA6F50e88C4dbd87360567d062328943bc49Aae5',
        passportConfiguratorAddress:
            '0x1773B6FCBb53b4A04663Dfe51Dd59ebf969514c4',
        passportEntityLogicAddress:
            '0xea6B8c85CD6A48c311cCe03B48F369dB5C3B978a',
        passportDelegationLogicAddress:
            '0x414EC83f6e706f2C6f4326e0204Af42f7874De23',
        passportPersonhoodLogicAddress:
            '0xFB2b8b900Ece2A534A6BE78bAFC2d054C09B75b0',
        passportPoPScoreLogicAddress:
            '0x01a488CF0f941098bE0e7dB14DE6046F1b51C164',
        passportSignalingLogicAddress:
            '0xd2599f2BBf3E3f45344d3FDFb1680f784eC3C911',
        passportWhitelistAndBlacklistLogicAddress:
            '0x1596e69Bd430388A860CEf94721aB39a12bcC1d1',
    }, // Passport Libraries
    b3trMultiSigAddress: '0x4Dd13fcb7b4f7DC19048ce0d23aAEbbDB3f3a1d9', // B3TR MultiSig //TODO: Do we need this?
    stargateNFTContractAddress: '0x1856c533ac2d94340aaa8544d35a5c1d4a21dee7', // Stargate NFT
    grantsManagerContractAddress: '0x055d20914657834c914d7c44bf65b566ab4b45a2', // Grants Manager

    //===============EXTERNAL CONTRACTS===============

    //VeDelegate Contracts
    veDelegateContractAddress: '0xfc32a9895C78CE00A1047d602Bd81Ea8134CC32b', // VeDelegate main Contract
    veDelegateVotesContractAddress:
        '0xeb71148c9B3cd57e228c2152d79f6e78F5F1ef9a', // VeDelegate Votes Contract
    veDelegateTokenContractAddress:
        '0xD3f7b82Df5705D34f64C634d2dEf6B1cB3116950', // VeDelegate Token Contract

    //VetDomains Contracts
    vetDomainsContractAddress: '0xcBFB30c1F267914816668d53AcBA7bA7c9806D13',
    vetDomainsPublicResolverAddress:
        '0xA6eFd130085a127D090ACb0b100294aD1079EA6f',
    vetDomainsReverseRegistrarAddress:
        '0x6878f1aD5e3015310CfE5B38d7B7071C5D8818Ca',
    vnsResolverAddress: '0xc403b8EA53F707d7d4de095f0A20bC491Cf2bc94',
    vetDomainAvatarUrl: 'https://testnet.vet.domains/api/avatar',
};
export default testnetAddresses;
