import { useGameStore } from '../utils/gameStore'
import { Modal } from './Modal'

const OPTIONS = [
  {
    key: 'test' as const,
    label: 'Test',
    description: 'Remove 83 cards',
  },
  {
    key: 'short' as const,
    label: 'Short',
    description: 'Remove 45 cards',
  },
  {
    key: 'medium' as const,
    label: 'Medium',
    description: 'Remove 30 cards',
  },
  {
    key: 'long' as const,
    label: 'Long',
    description: 'Remove 15 cards',
  },
]

export function GameLengthModal() {
  const show = useGameStore((s) => s.showGameLengthModal)
  const startWithGameLength = useGameStore((s) => s.startWithGameLength)

  return (
    <Modal show={show}>
      <div className="flex flex-col gap-4 bg-surface rounded-lg shadow-xl w-[calc(100vw-40px)] min-w-72 max-w-sm p-6">
        <h2 className="text-2xl font-bold text-center">Game Length</h2>
        <div className="flex flex-col gap-2">
          {OPTIONS.filter(
            (o) =>
              o.key !== 'test' || window.location.href.includes('localhost'),
          ).map((option) => (
            <button
              key={option.key}
              className="button w-full py-2 px-4 rounded bg-primary text-white font-bold"
              onClick={() => startWithGameLength(option.key)}>
              {option.label}
              <span className="ml-2 opacity-80 font-medium text-sm">
                ({option.description})
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}
