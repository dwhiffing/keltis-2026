import { useShallow } from 'zustand/react/shallow'
import { getScore, useGameStore } from '../utils/gameStore'
import { useMultiplayerStore } from '../utils/multiplayerStore'
import { Modal } from './Modal'

export const GameOverModal = () => {
  const { gameOver, cards, newGame, localPlayerIndex } = useGameStore(
    useShallow((state) => ({
      gameOver: state.gameOver,
      cards: state.cards,
      newGame: state.newGame,
      localPlayerIndex: state.localPlayerIndex,
    })),
  )
  const { mode } = useMultiplayerStore(useShallow((s) => ({ mode: s.mode })))
  const isGuest = mode === 'multiplayer' && localPlayerIndex === 1

  const myIndex = localPlayerIndex
  const opponentIndex: 0 | 1 = myIndex === 0 ? 1 : 0
  const myScore = getScore(myIndex, cards)
  const opponentScore = getScore(opponentIndex, cards)
  const winner =
    myScore > opponentScore
      ? 'You win!'
      : opponentScore > myScore
        ? 'Opponent wins!'
        : "It's a tie!"

  return (
    <Modal show={gameOver}>
      <div className="flex flex-col gap-6 bg-surface rounded-lg shadow-xl w-[calc(100vw-40px)] min-w-72 max-w-sm p-6">
        <h2 className="text-2xl font-bold text-center">Game Over</h2>

        <div className="flex justify-around text-center">
          <div>
            <div className="text-sm opacity-60 mb-1">You</div>
            <div className="text-4xl font-bold">{myScore}</div>
          </div>
          <div>
            <div className="text-sm opacity-60 mb-1">Opponent</div>
            <div className="text-4xl font-bold">{opponentScore}</div>
          </div>
        </div>

        <p className="text-center text-lg font-semibold">{winner}</p>

        {isGuest ? (
          <p className="text-center text-sm opacity-60">
            Waiting for host to start a new game…
          </p>
        ) : (
          <button
            className="w-full py-2 px-4 rounded bg-primary text-white font-bold"
            onClick={newGame}>
            New Game
          </button>
        )}
      </div>
    </Modal>
  )
}
