import { CHARACTERS, ACCESSORIES } from '../constants/items'
import './CharacterDisplay.css'

const CHARACTER_SIZE_PX = 128

type CharacterDisplayProps = {
  characterId: string
  equippedAccessories: string[]
  /** Scale factor for display size (default 1). Use e.g. 1.5 for larger preview. */
  scale?: number
  className?: string
}

export function CharacterDisplay({
  characterId,
  equippedAccessories,
  scale = 1,
  className = '',
}: CharacterDisplayProps) {
  const character = CHARACTERS.find((c) => c.id === characterId)
  const size = CHARACTER_SIZE_PX * scale

  if (!character) {
    return (
      <div
        className={`character-display ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="character-display__fallback">?</div>
      </div>
    )
  }

  return (
    <div
      className={`character-display ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="character-display__layer character-display__base"
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${character.image})`,
          backgroundSize: `${size}px ${size}px`,
        }}
      />
      {equippedAccessories.map((accId) => {
        const acc = ACCESSORIES.find((a) => a.id === accId)
        if (!acc) return null
        return (
          <div
            key={accId}
            className="character-display__layer character-display__overlay"
            style={{
              width: size,
              height: size,
              backgroundImage: `url(${acc.image})`,
              backgroundSize: `${size}px ${size}px`,
              backgroundPosition: '0 0',
            }}
          />
        )
      })}
    </div>
  )
}
