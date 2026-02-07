import React, { useState } from 'react'
import './Store.css'

type StoreCategory = 'all' | 'nametags' | 'accessories' | 'characters'

const PLACEHOLDER_ITEMS = [
  { id: 'n1', category: 'nametags' as const, label: 'Nametag', cost: 0 },
  { id: 'n2', category: 'nametags' as const, label: 'Nametag', cost: 200 },
  { id: 'n3', category: 'nametags' as const, label: 'Nametag', cost: 500 },
  { id: 'a1', category: 'accessories' as const, label: 'Accessory', cost: 50 },
  { id: 'a2', category: 'accessories' as const, label: 'Accessory', cost: 30 },
  { id: 'a3', category: 'accessories' as const, label: 'Accessory', cost: 40 },
  { id: 'a4', category: 'accessories' as const, label: 'Accessory', cost: 80 },
  { id: 'a5', category: 'accessories' as const, label: 'Accessory', cost: 100 },
  { id: 'c1', category: 'characters' as const, label: 'Character', cost: 0 },
  { id: 'c2', category: 'characters' as const, label: 'Character', cost: 150 },
  { id: 'c3', category: 'characters' as const, label: 'Character', cost: 200 },
]

export function Store() {
  const [category, setCategory] = useState<StoreCategory>('all')

  const filtered =
    category === 'all'
      ? PLACEHOLDER_ITEMS
      : PLACEHOLDER_ITEMS.filter((i) => i.category === category)

  return (
    <div className="store">
      <div className="store__card">
        <h2 className="store__title">Store</h2>
        <p className="store__sub">Customize your character. Placeholder boxes for designs.</p>
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
          {filtered.map((item) => (
            <div key={item.id} className="store__item">
              <div className="store__item-box">
                {/* Placeholder for design asset */}
              </div>
              <span className="store__item-label">{item.label}</span>
              <span className="store__item-cost">{item.cost === 0 ? 'Free' : `${item.cost} pts`}</span>
            </div>
          ))}
        </div>
        <p className="store__hint">Buy & equip from the Character tab.</p>
      </div>
      <span className="store__sparkle">✦</span>
    </div>
  )
}
