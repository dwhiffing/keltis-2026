import { useShallow } from 'zustand/react/shallow'
import { getScore, useGameStore } from '../utils/gameStore'
import { Modal } from './Modal'

export const GameOverModal = () => {
  const { gameOver, cards, newGame } = useGameStore(
    useShallow((state) => ({
      gameOver: state.gameOver,
      cards: state.cards,
      newGame: state.newGame,
    })),
  )

  const score0 = getScore(0, cards)
  const score1 = getScore(1, cards)
  const winner =
    score0 > score1
      ? 'You win!'
      : score1 > score0
        ? 'Opponent wins!'
        : "It's a tie!"

  return (
    <Modal show={gameOver}>
      <div className="flex flex-col gap-6 bg-surface rounded-lg shadow-xl w-[calc(100vw-40px)] min-w-72 max-w-sm p-6">
        <h2 className="text-2xl font-bold text-center">Game Over</h2>

        <div className="flex justify-around text-center">
          <div>
            <div className="text-sm opacity-60 mb-1">You</div>
            <div className="text-4xl font-bold">{score0}</div>
          </div>
          <div>
            <div className="text-sm opacity-60 mb-1">Opponent</div>
            <div className="text-4xl font-bold">{score1}</div>
          </div>
        </div>

        <p className="text-center text-lg font-semibold">{winner}</p>

        <button
          className="w-full py-2 px-4 rounded bg-primary text-white font-bold"
          onClick={newGame}>
          New Game
        </button>
      </div>
    </Modal>
  )
}
