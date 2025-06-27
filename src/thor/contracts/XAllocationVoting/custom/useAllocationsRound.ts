import { useMemo } from 'react';
import {
    RoundState,
    useAllocationsRoundState,
    useCurrentAllocationsRoundId,
    useCurrentBlock,
    RoundCreated,
    useAllocationsRoundsEvents,
} from '@thor';
import { getConfig } from '@config';
import { NETWORK_TYPE } from "@config/network";
import { ThorClient } from "@vechain/sdk-network";

export type AllocationRoundWithState = RoundCreated & {
    state?: keyof typeof RoundState;
    voteStartTimestamp?: number;
    voteEndTimestamp?: number;
    isCurrent: boolean;
};

/**
 *  Hook to get and merge info about the given allocation round (state, proposer, voreStart, voteEnd)
 * @returns the allocation round info see {@link AllocationRoundWithState}
 */
export const useAllocationsRound = (
    thor: ThorClient,
    networkType: NETWORK_TYPE,
    roundId?: string
) => {
    const { data: currentBlock } = useCurrentBlock(thor);
    const currentAllocationId = useCurrentAllocationsRoundId(thor, networkType);
    const currentAllocationState = useAllocationsRoundState(thor, networkType, roundId);

    const allocationRoundsEvents = useAllocationsRoundsEvents(thor, networkType);

    const currentAllocationRound: AllocationRoundWithState | undefined =
        useMemo(() => {
            if (!currentAllocationId.data || !allocationRoundsEvents.data)
                return;
            const roundInfo = allocationRoundsEvents.data.created.find(
                (allocationRound) => allocationRound.roundId === roundId,
            );
            if (!roundInfo) return;
            return {
                ...roundInfo,
                state: (currentAllocationState.data as readonly [number] | undefined)?.[0] as keyof typeof RoundState,
                isCurrent: roundId === currentAllocationId.data?.toString(),
            };
        }, [
            currentAllocationId,
            allocationRoundsEvents,
            currentAllocationState,
            roundId,
        ]);

    const isLoading =
        currentAllocationId.isLoading ||
        allocationRoundsEvents.isLoading ||
        currentAllocationState.isLoading;
    const isError =
        currentAllocationId.isError ||
        allocationRoundsEvents.isError ||
        currentAllocationState.isError;
    const error =
        currentAllocationId.error ||
        allocationRoundsEvents.error ||
        currentAllocationState.error;

    const blockTime = getConfig(networkType).network.blockTime;

    const estimatedEndTime = useMemo(() => {
        if (!currentAllocationRound) return null;
        const endBlock = Number(currentAllocationRound.voteEnd);
        if (!endBlock || !currentBlock) return null;
        const endBlockFromNow = endBlock - currentBlock.number;

        const durationLeftTimestamp = endBlockFromNow * blockTime;
        return Date.now() + durationLeftTimestamp;
    }, [currentBlock, currentAllocationRound, blockTime]);

    const estimatedStartTime = useMemo(() => {
        if (!currentAllocationRound) return null;
        const startBlock = Number(currentAllocationRound.voteStart);

        if (!startBlock || !currentBlock) return null;
        const endBlockFromNow = startBlock - currentBlock.number;
        const durationLeftTimestamp = endBlockFromNow * blockTime;
        return Date.now() + durationLeftTimestamp;
    }, [currentBlock, currentAllocationRound, blockTime]);

    const isFirstRound = currentAllocationRound?.roundId === '1';
    const isLastRound =
        currentAllocationRound?.roundId ===
        allocationRoundsEvents?.data?.created.length.toString();
    return {
        ...allocationRoundsEvents,
        data: {
            ...currentAllocationRound,
            voteStartTimestamp: estimatedStartTime,
            voteEndTimestamp: estimatedEndTime,
            isFirstRound,
            isLastRound,
        },
        isLoading,
        isError,
        error,
    };
};
