import { useState } from 'react'
import { usePoints } from '../context/PointsContext'
import { CHARACTERS, ACCESSORIES, NAMETAGS } from '../constants/items'
import { CharacterDisplay } from './CharacterDisplay'
import './Character.css'

export function Character() {
  const { profile, setDisplayName, setNametagStyle, setCharacterId, unlockItem, equipAccessory, unequipAccessory } = usePoints()
  const [activeTab, setActiveTab] = useState<'nametag' | 'accessory' | 'character'>('nametag')

  return (
    <div className="character">
      <div className="character__card">
        <h2 className="character__title">Character & rewards</h2>
        <p className="character__sub">Spend points on nametags, accessories, and characters.</p>
        <div className="character__preview">
          <div className="character__avatar-wrap">
            <CharacterDisplay
              characterId={profile.characterId}
              equippedAccessories={profile.equippedAccessories}
              scale={1.75}
              className="character__avatar-display"
            />
          </div>
          <label className="character__name-label">
            Display name (for leaderboard)
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => setDisplayName(e.target.value.trim() || 'Studier')}
              className="character__name-input"
            />
          </label>
          <span className={`nametag nametag--${profile.nametagStyle}`}>
            {profile.nametagStyle === 'crown' && <span className="nametag__icon">👑</span>}
            {profile.displayName}
          </span>
        </div>
        <p className="character__points">You have <strong>{profile.points}</strong> points</p>
        <div className="character__tabs">
          {(['nametag', 'accessory', 'character'] as const).map((tab) => (
            <button
              key={tab}
              className={`character__tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'nametag' ? 'Nametags' : tab === 'accessory' ? 'Accessories' : 'Characters'}
            </button>
          ))}
        </div>
        <div className="character__shop">
          {activeTab === 'nametag' && (
            <ul className="character__list">
              {NAMETAGS.map((item) => {
                const owned = item.cost === 0 || profile.unlockedNametags.includes(item.id)
                const canBuy = !owned && profile.points >= item.cost
                return (
                  <li key={item.id} className="character__item">
                    <span className={`nametag nametag--${item.style}`}>
                      {item.style === 'crown' && <span className="nametag__icon">👑</span>}
                      {item.name}
                    </span>
                    <span className="character__cost">{item.cost === 0 ? 'Default' : `${item.cost} pts`}</span>
                    {owned ? (
                      <button
                        className="character__btn small"
                        onClick={() => setNametagStyle(item.style)}
                        disabled={profile.nametagStyle === item.style}
                      >
                        {profile.nametagStyle === item.style ? 'Equipped' : 'Equip'}
                      </button>
                    ) : canBuy ? (
                      <button
                        className="character__btn small primary"
                        onClick={() => unlockItem(item.id, item.cost, 'nametag')}
                      >
                        Unlock
                      </button>
                    ) : (
                      <span className="character__locked">{item.cost} pts</span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          {activeTab === 'accessory' && (
            <ul className="character__list">
              {ACCESSORIES.map((item) => {
                const owned = profile.ownedAccessories.includes(item.id)
                const equipped = profile.equippedAccessories.includes(item.id)
                const canBuy = !owned && profile.points >= item.cost
                return (
                  <li key={item.id} className="character__item">
                    <div
                      className="character__item-thumb"
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    />
                    <span>{item.name}</span>
                    <span className="character__cost">{item.cost} pts</span>
                    {equipped ? (
                      <button className="character__btn small" onClick={() => unequipAccessory(item.id)}>
                        Unequip
                      </button>
                    ) : owned ? (
                      <button className="character__btn small primary" onClick={() => equipAccessory(item.id)}>
                        Equip
                      </button>
                    ) : canBuy ? (
                      <button
                        className="character__btn small primary"
                        onClick={() => unlockItem(item.id, item.cost, 'accessory')}
                      >
                        Buy & equip
                      </button>
                    ) : (
                      <span className="character__locked">Need {item.cost} pts</span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          {activeTab === 'character' && (
            <ul className="character__list">
              {CHARACTERS.map((item) => {
                const owned = item.cost === 0 || profile.unlockedCharacters.includes(item.id)
                const canBuy = !owned && profile.points >= item.cost
                return (
                  <li key={item.id} className="character__item">
                    <CharacterDisplay
                      characterId={item.id}
                      equippedAccessories={[]}
                      scale={0.5}
                      className="character__item-char"
                    />
                    <span>{item.name}</span>
                    <span className="character__cost">{item.cost === 0 ? 'Default' : `${item.cost} pts`}</span>
                    {owned ? (
                      <button
                        className="character__btn small"
                        onClick={() => setCharacterId(item.id)}
                        disabled={profile.characterId === item.id}
                      >
                        {profile.characterId === item.id ? 'Equipped' : 'Equip'}
                      </button>
                    ) : canBuy ? (
                      <button
                        className="character__btn small primary"
                        onClick={() => unlockItem(item.id, item.cost, 'character')}
                      >
                        Unlock
                      </button>
                    ) : (
                      <span className="character__locked">{item.cost} pts</span>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
