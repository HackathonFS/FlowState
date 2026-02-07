export type TabId = 'home' | 'pomodoro' | 'checklist' | 'studycall' | 'store' | 'leaderboard' | 'character'

export interface Task {
  id: string
  title: string
  points: number
  done: boolean
  createdAt: number
}

export type NametagStyle = 'default' | 'gold' | 'crown'
export type AccessoryId = string
export type CharacterId = string

export interface UserProfile {
  displayName: string
  points: number
  communityId: string | null
  collegeId: string | null
  nametagStyle: NametagStyle
  equippedAccessories: AccessoryId[]
  ownedAccessories: AccessoryId[]
  unlockedNametags: string[]
  unlockedCharacters: string[]
  characterId: CharacterId
}

export interface LeaderboardEntry {
  id: string
  displayName: string
  points: number
  rank: number
  nametagStyle: NametagStyle
  characterId: CharacterId
}

export interface Community {
  id: string
  name: string
  memberCount: number
}

export interface ShopItem {
  id: string
  name: string
  cost: number
  type: 'accessory' | 'nametag' | 'character'
  unlocked: boolean
}
