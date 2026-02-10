import { ContractAddressesConfig } from './type';

const testnetAddresses: ContractAddressesConfig = {
    //===============INTERNAL CONTRACTS===============
    //VeBetterDAO Contracts
    b3trContractAddress: '0x95761346d18244bb91664181bf91193376197088',
    vot3ContractAddress: '0x6e8b4a88d37897fc11f6ba12c805695f1c41f40e',
    b3trGovernorAddress: '0xc30b4d0837f7e3706749655d8bde0c0f265dd81b',
    timelockContractAddress: '0x835509222aa67c333a1cbf29bd341e014aba86c9',
    xAllocationPoolContractAddress:
        '0x6f7b4bc19b4dc99005b473b9c45ce2815bbe7533',
    xAllocationVotingContractAddress:
        '0x8800592c463f0b21ae08732559ee8e146db1d7b2',
    emissionsContractAddress: '0x66898f98409db20ed6a1bf0021334b7897eb0688',
    voterRewardsContractAddress: '0x851ef91801899a4e7e4a3174a9300b3e20c957e8',
    galaxyMemberContractAddress: '0x38a59fa7fd7039884465a0ff285b8c4b6fe394ca',
    x2EarnCreatorContractAddress: '0xb89f0ecdaf9987f87912d6c77756435fe4085b05',
    nodeManagementContractAddress: '0xde17d0a516c38c168d37685bb71465f656aa256e',
    x2EarnAppsContractAddress: '0x0b54a094b877a25bdc95b4431eaa1e2206b1ddfe',
    treasuryContractAddress: '0x3d531a80c05099c71b02585031f86a2988e0caca',
    x2EarnRewardsPoolContractAddress:
        '0x2d2a2207c68a46fc79325d7718e639d1047b0d8b',
    veBetterPassportContractAddress:
        '0x592c756df7a5d39de1735030e8b9c18b7417e6c4',
    tokenAuctionContractAddress: '', // Token Auction
    b3trGovernorLibraries: {
        governorClockLogicAddress: "0xf33d6fb7d7b26cfc68fc57a9a52b7358ba1b4705",
        governorConfiguratorAddress: "0xc72b2e854d48ef6a47badb8c13548b15a34022c0",
        governorDepositLogicAddress: "0x5bfda0abb9fdd8600f02c7defca34866b5560c6e",
        governorFunctionRestrictionsLogicAddress: "0xc87376cbe6c02e96129f24a5b1167b1d1b74dcae",
        governorProposalLogicAddressAddress: "0x85a89965a4791d13ccb2e4fa6a9f28a4ec5308bb",
        governorQuorumLogicAddress: "0x8d54c011aff47941ec22f1ba9488f572a183d0d6",
        governorStateLogicAddress: "0x6f727492eb384b93c7f81bb304917d8e8bc70c40",
        governorVotesLogicAddress: "0xbff2d3f8e2422992cdf1347f8de93cbb02c0bb7e",
    }, // B3TR Governor Libraries
    passportLibraries: {
        passportChecksLogicAddress: "0x252c2ea0e7cae88b8b7c73861b07c2b97b12aa76",
        passportConfiguratorAddress: "0x568fcb3479989c4113dc19e47d204031b1223b37",
        passportEntityLogicAddress: "0xfb511e92eb27f5f448fa0f06b9e46626a80926fc",
        passportDelegationLogicAddress: "0xd4bc0be20de99249b3d1945ec500ab95c816dd5f",
        passportPersonhoodLogicAddress: "0xada28d485d0972f45ae0e50c4458244618ed7a09",
        passportPoPScoreLogicAddress: "0x0ba56426b5716e9b92b38bd24f7c6cb122d3505d",
        passportSignalingLogicAddress: "0x68482ad6d4546bccd68862d345ef57facd2e02c6",
        passportWhitelistAndBlacklistLogicAddress: "0x45feba7af9219ad26967b2db82d6ef9297219881",
    }, // Passport Libraries
    b3trMultiSigAddress: '0x4Dd13fcb7b4f7DC19048ce0d23aAEbbDB3f3a1d9', // B3TR MultiSig //TODO: Do we need this?
    stargateNFTContractAddress: '0x1856c533ac2d94340aaa8544d35a5c1d4a21dee7', // Stargate NFT
    grantsManagerContractAddress: '0x055d20914657834c914d7c44bf65b566ab4b45a2', // Grants Manager
    relayerRewardsPoolContractAddress:
        '0x92b5a7484970d9b2ad981e8135ff14e6f996dc04', // Relayer Rewards Pool
    dbaPoolContractAddress: '0x328710f4925c3e4c04961882b96c50cc7cd9d958', // DBA Pool
    xAllocationVotingLibraries: {
        autoVotingLogicAddress: '0x6a69d971f78fcc31d79bc1216f86c212def17b25',
    },

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
