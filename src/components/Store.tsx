import { useState } from 'react'
import { usePoints } from '../context/PointsContext'
import { CHARACTERS, ACCESSORIES, NAMETAGS } from '../constants/items'
import { CharacterDisplay } from './CharacterDisplay'
import './Store.css'

type StoreCategory = 'all' | 'nametags' | 'accessories' | 'characters'

export function Store() {
  const { profile, unlockItem } = usePoints()
  const [category, setCategory] = useState<StoreCategory>('all')

  const nametagItems = NAMETAGS.filter((item) => item.cost > 0 && !profile.unlockedNametags.includes(item.id))
  const accessoryItems = ACCESSORIES.filter((item) => !profile.ownedAccessories.includes(item.id))
  const characterItems = CHARACTERS.filter(
    (item) => item.cost > 0 && !profile.unlockedCharacters.includes(item.id)
  )

  const allItems = [
    ...nametagItems.map((item) => ({ ...item, type: 'nametag' as const })),
    ...accessoryItems.map((item) => ({ ...item, type: 'accessory' as const })),
    ...characterItems.map((item) => ({ ...item, type: 'character' as const })),
  ]

  const filtered =
    category === 'all'
      ? allItems
      : category === 'nametags'
        ? allItems.filter((i) => i.type === 'nametag')
        : category === 'accessories'
          ? allItems.filter((i) => i.type === 'accessory')
          : allItems.filter((i) => i.type === 'character')

  const handleBuy = (item: (typeof allItems)[number]) => {
    if (item.type === 'nametag' && 'style' in item) {
      unlockItem(item.id, item.cost, 'nametag')
    } else if (item.type === 'accessory' && 'image' in item) {
      unlockItem(item.id, item.cost, 'accessory')
    } else if (item.type === 'character' && 'image' in item) {
      unlockItem(item.id, item.cost, 'character')
    }
  }

  return (
    <div className="store">
      <div className="store__card">
        <h2 className="store__title">Store</h2>
        <p className="store__sub">Buy items here — they will appear in the Character tab for you to equip.</p>
        <div className="store__filters">
          {(['all', 'nametags', 'accessories', 'characters'] as const).map((c) => (
            <button
              key={c}
              className={`store__filter ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c === 'all' ? 'All' : c === 'nametags' ? 'Nametags' : c === 'accessories' ? 'Accessories' : 'Characters'}
            </button>
          ))}
        </div>
        <div className="store__grid">
          {filtered.map((item) => {
            const canBuy = profile.points >= item.cost
            if (item.type === 'nametag') {
              return (
                <div key={`n-${item.id}`} className="store__item">
                  <span className={`nametag nametag--${item.style}`}>
                    {item.style === 'crown' && <span className="nametag__icon">👑</span>}
                    {item.name}
                  </span>
                  <span className="store__item-cost">{item.cost} pts</span>
                  <button
                    className="store__btn"
                    disabled={!canBuy}
                    onClick={() => handleBuy(item)}
                  >
                    {canBuy ? 'Buy' : 'Need more pts'}
                  </button>
                </div>
              )
            }
            if (item.type === 'accessory') {
              return (
                <div key={`a-${item.id}`} className="store__item">
                  <div
                    className="store__item-box"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <span className="store__item-label">{item.name}</span>
                  <span className="store__item-cost">{item.cost} pts</span>
                  <button
                    className="store__btn"
                    disabled={!canBuy}
                    onClick={() => handleBuy(item)}
                  >
                    {canBuy ? 'Buy' : 'Need more pts'}
                  </button>
                </div>
              )
            }
            return (
              <div key={`c-${item.id}`} className="store__item">
                <div className="store__item-char">
                  <CharacterDisplay
                    characterId={item.id}
                    equippedAccessories={[]}
                    scale={0.75}
                  />
                </div>
                <span className="store__item-label">{item.name}</span>
                <span className="store__item-cost">{item.cost} pts</span>
                <button
                  className="store__btn"
                  disabled={!canBuy}
                  onClick={() => handleBuy(item)}
                >
                  {canBuy ? 'Buy' : 'Need more pts'}
                </button>
              </div>
            )
          })}
        </div>
        {allItems.length === 0 && (
          <p className="store__empty">You own everything! Equip items in the Character tab.</p>
        )}
        {allItems.length > 0 && (
          <p className="store__hint">After buying, equip from the Character tab.</p>
        )}
      </div>
      <span className="store__sparkle">✦</span>
    </div>
  )
}
