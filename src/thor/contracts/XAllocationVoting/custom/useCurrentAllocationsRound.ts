import { useCurrentAllocationsRoundId, useAllocationsRound } from '@thor';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

/**
 * Hook to get info about the current allocation round
 * @returns the current allocation round info see {@link AllocationRoundWithState}
 */
export const useCurrentAllocationsRound = (thor:ThorClient, networkType: NETWORK_TYPE) => {
    const currentRoundId = useCurrentAllocationsRoundId(thor, networkType);
    const allocationsRound = useAllocationsRound(thor, networkType, currentRoundId.data?.[0]?.toString());

    return {
        ...allocationsRound,
        isLoading: currentRoundId.isLoading || allocationsRound.isLoading,
        isError: currentRoundId.isError || allocationsRound.isError,
        error: currentRoundId.error || allocationsRound.error,
    };
};
