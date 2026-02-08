import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react'
import type { Task, UserProfile, NametagStyle } from '../types'

const STORAGE_KEY = 'flow-state-data'

const defaultProfile: UserProfile = {
  displayName: 'Studier',
  points: 0,
  communityId: null,
  collegeId: null,
  nametagStyle: 'default',
  equippedAccessories: [],
  ownedAccessories: [],
  unlockedNametags: ['default'],
  unlockedCharacters: ['default'],
  characterId: 'default',
}

function loadData(): { profile: UserProfile; tasks: Task[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        profile: { ...defaultProfile, ...parsed.profile },
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      }
    }
  } catch (_) {}
  return { profile: defaultProfile, tasks: [] }
}

function saveData(profile: UserProfile, tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, tasks }))
  } catch (_) {}
}

type PointsContextValue = {
  profile: UserProfile
  tasks: Task[]
  addPoints: (n: number) => void
  spendPoints: (n: number) => boolean
  setDisplayName: (name: string) => void
  setCommunity: (id: string | null) => void
  setCollege: (id: string | null) => void
  setNametagStyle: (style: NametagStyle) => void
  setCharacterId: (id: string) => void
  equipAccessory: (id: string) => void
  unequipAccessory: (id: string) => void
  addTask: (task: Omit<Task, 'id' | 'done' | 'createdAt'>) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  unlockItem: (itemId: string, cost: number, type: 'accessory' | 'nametag' | 'character') => boolean
}

const PointsContext = createContext<PointsContextValue | null>(null)

export function PointsProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [tasks, setTasks] = useState<Task[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const { profile: p, tasks: t } = loadData()
    setProfile(p)
    setTasks(t)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveData(profile, tasks)
  }, [hydrated, profile, tasks])

  const addPoints = useCallback((n: number) => {
    setProfile((p) => ({ ...p, points: p.points + n }))
  }, [])

  const spendPoints = useCallback((n: number): boolean => {
    if (profile.points < n) return false
    setProfile((p) => ({ ...p, points: p.points - n }))
    return true
  }, [profile.points])

  const setDisplayName = useCallback((name: string) => {
    setProfile((p) => ({ ...p, displayName: name }))
  }, [])

  const setCommunity = useCallback((id: string | null) => {
    setProfile((p) => ({ ...p, communityId: id }))
  }, [])

  const setCollege = useCallback((id: string | null) => {
    setProfile((p) => ({ ...p, collegeId: id }))
  }, [])

  const setNametagStyle = useCallback((style: NametagStyle) => {
    setProfile((p) => ({ ...p, nametagStyle: style }))
  }, [])

  const setCharacterId = useCallback((id: string) => {
    setProfile((p) => ({ ...p, characterId: id }))
  }, [])

  const equipAccessory = useCallback((id: string) => {
    setProfile((p) => ({
      ...p,
      equippedAccessories: p.equippedAccessories.includes(id) ? p.equippedAccessories : [...p.equippedAccessories, id],
    }))
  }, [])

  const unequipAccessory = useCallback((id: string) => {
    setProfile((p) => ({
      ...p,
      equippedAccessories: p.equippedAccessories.filter((a) => a !== id),
    }))
  }, [])

  const addTask = useCallback((task: Omit<Task, 'id' | 'done' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      done: false,
      createdAt: Date.now(),
    }
    setTasks((t) => [newTask, ...t])
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((t) =>
      t.map((task) => {
        if (task.id !== id) return task
        const next = { ...task, done: !task.done }
        if (next.done) setProfile((p) => ({ ...p, points: p.points + task.points }))
        return next
      })
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((t) => t.filter((task) => task.id !== id))
  }, [])

  const unlockItem = useCallback(
    (itemId: string, cost: number, type: 'accessory' | 'nametag' | 'character'): boolean => {
      if (profile.points < cost) return false
      setProfile((p) => {
        const next = { ...p, points: p.points - cost }
        if (type === 'nametag') {
          next.unlockedNametags = p.unlockedNametags.includes(itemId) ? p.unlockedNametags : [...p.unlockedNametags, itemId]
          if (itemId === 'gold') next.nametagStyle = 'gold'
          else if (itemId === 'crown') next.nametagStyle = 'crown'
        } else if (type === 'character') {
          next.unlockedCharacters = p.unlockedCharacters.includes(itemId) ? p.unlockedCharacters : [...p.unlockedCharacters, itemId]
          next.characterId = itemId
        } else {
          next.ownedAccessories = p.ownedAccessories.includes(itemId) ? p.ownedAccessories : [...p.ownedAccessories, itemId]
          next.equippedAccessories = p.equippedAccessories.includes(itemId) ? p.equippedAccessories : [...p.equippedAccessories, itemId]
        }
        return next
      })
      return true
    },
    [profile.points]
  )

  const value = useMemo<PointsContextValue>(
    () => ({
      profile,
      tasks,
      addPoints,
      spendPoints,
      setDisplayName,
      setCommunity,
      setCollege,
      setNametagStyle,
      setCharacterId,
      equipAccessory,
      unequipAccessory,
      addTask,
      toggleTask,
      deleteTask,
      unlockItem,
    }),
    [
      profile,
      tasks,
      addPoints,
      spendPoints,
      setDisplayName,
      setCommunity,
      setCollege,
      setNametagStyle,
      setCharacterId,
      equipAccessory,
      unequipAccessory,
      addTask,
      toggleTask,
      deleteTask,
      unlockItem,
    ]
  )

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
}

export function usePoints() {
  const ctx = useContext(PointsContext)
  if (!ctx) throw new Error('usePoints must be used within PointsProvider')
  return ctx
}
