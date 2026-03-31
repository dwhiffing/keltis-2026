import { useShallow } from 'zustand/shallow'
import { NUM_DISCARD_PILES, NUM_SUITS } from '../utils/constants'
import { useGameStore } from '../utils/gameStore'

const WISHING_STONE_RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const WishingStonePile = (props: { playerIndex: number }) => {
  const state = useGameStore(
    useShallow((state) => ({
      stones: state.stones,
      claimWishingStone: state.claimWishingStone,
      claimingRank:
        state.currentPlayerIndex === state.localPlayerIndex
          ? (state.stoneClaim?.rank ?? null)
          : null,
      cards: state.cards,
      localPlayerIndex: state.localPlayerIndex,
      isShuffling: state.dealPhase !== -1,
      turnsUntilEnd: state.turnsUntilEnd,
    })),
  )

  const isLocalPlayer = state.localPlayerIndex === props.playerIndex
  const claimingRank = isLocalPlayer ? state.claimingRank : null
  const activeClaimableStones =
    !isLocalPlayer ||
    state.isShuffling ||
    typeof state.turnsUntilEnd === 'number'
      ? []
      : getClaimableStones(state.cards, state.stones, props.playerIndex).filter(
          (i) => i !== claimingRank,
        )

  return (
    <div
      className="w-full flex items-center gap-board justify-center py-4"
      style={{ minHeight: 'calc(var(--base-size) * 0.51 + 2rem)' }}>
      {WISHING_STONE_RANKS.map((rank) => {
        const isOwned = state.stones[props.playerIndex].includes(rank)
        const isClaiming = claimingRank === rank
        const isClaimable = activeClaimableStones.includes(rank)
        const stateClass = isOwned
          ? 'claimed'
          : isClaiming
            ? 'claiming'
            : isClaimable
              ? 'claimable'
              : ''

        return (
          <button
            key={`stone-${rank}`}
            type="button"
            className={`wishing-stone ${stateClass}`}
            onClick={() => state.claimWishingStone(rank)}
            disabled={!isClaimable}>
            {rank}
          </button>
        )
      })}
    </div>
  )
}
function getClaimableStones(
  cards: CardType[],
  stones: [number[], number[]],
  playerIndex: number,
): number[] {
  const handPile = playerIndex === 0 ? NUM_SUITS * 2 + NUM_DISCARD_PILES + 2 : 1
  const handCards = cards.filter((c) => c.pileIndex === handPile)
  const rankCounts = new Map<number, number>()
  for (const card of handCards) {
    rankCounts.set(card.rank, (rankCounts.get(card.rank) ?? 0) + 1)
  }
  const taken = new Set([...stones[0], ...stones[1]])
  const claimable: number[] = []
  for (const [rank, count] of rankCounts) {
    if (rank > 0 && count >= 2 && rank <= 9 && !taken.has(rank)) {
      claimable.push(rank)
    }
  }
  return claimable.sort((a, b) => a - b)
}
