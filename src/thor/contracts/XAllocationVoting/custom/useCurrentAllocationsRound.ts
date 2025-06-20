import { useCurrentAllocationsRoundId, useAllocationsRound } from '@thor';
import { NETWORK_TYPE } from "@config/network";

/**
 * Hook to get info about the current allocation round
 * @returns the current allocation round info see {@link AllocationRoundWithState}
 */
export const useCurrentAllocationsRound = (networkType: NETWORK_TYPE) => {
    const currentRoundId = useCurrentAllocationsRoundId(networkType);
    const allocationsRound = useAllocationsRound(networkType, currentRoundId.data);

    return {
        ...allocationsRound,
        isLoading: currentRoundId.isLoading || allocationsRound.isLoading,
        isError: currentRoundId.isError || allocationsRound.isError,
        error: currentRoundId.error || allocationsRound.error,
    };
};
