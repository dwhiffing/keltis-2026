import { useShallow } from 'zustand/shallow'
import { NUM_DISCARD_PILES, NUM_SUITS } from '../utils/constants'
import { useGameStore } from '../utils/gameStore'

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
      isShuffling: state.dealPhase === 0,
    })),
  )
  const isLocalPlayer = state.localPlayerIndex === props.playerIndex
  const claimableStones = isLocalPlayer
    ? getClaimableStones(state.cards, state.stones, props.playerIndex).filter(
        (i) => i !== state.claimingRank,
      )
    : []
  return (
    <div className="w-full flex items-center gap-board justify-center py-4">
      <button type="button" className={`wishing-stone invisible w-0`}>
        0
      </button>
      {state.stones[props.playerIndex].map((i) => (
        <button key={`owned-${i}`} type="button" className="wishing-stone">
          {i}
        </button>
      ))}
      {isLocalPlayer && state.claimingRank !== null && (
        <button
          key={`claiming-${state.claimingRank}`}
          type="button"
          className="wishing-stone claiming">
          {state.claimingRank}
        </button>
      )}
      {!state.isShuffling &&
        claimableStones.map((i) => (
          <button
            key={`claimable-${i}`}
            type="button"
            className="wishing-stone claimable"
            onClick={() => state.claimWishingStone(i)}>
            {i}
          </button>
        ))}
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
