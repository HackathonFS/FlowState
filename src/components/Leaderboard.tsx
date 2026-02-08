import { useState, useMemo } from 'react'
import { usePoints } from '../context/PointsContext'
import type { LeaderboardEntry } from '../types'
import { CharacterDisplay } from './CharacterDisplay'
import './Leaderboard.css'

const MOCK_COMMUNITIES = [
  { id: 'cs-101', name: 'CS 101 Study Group', memberCount: 24 },
  { id: 'design', name: 'Design Squad', memberCount: 12 },
]
const MOCK_COLLEGES = [
  { id: 'state-u', name: 'State University' },
  { id: 'tech-institute', name: 'Tech Institute' },
]

const COMMUNITY_PEOPLE: Record<string, Omit<LeaderboardEntry, 'rank' | 'points'>[]> = {
  'cs-101': [
    { id: 'c1', displayName: 'CodeNinja', nametagStyle: 'crown', characterId: 'expensiveboy', equippedAccessories: ['star', 'heart'] },
    { id: 'c2', displayName: 'AlgoQueen', nametagStyle: 'gold', characterId: 'expensivegirl', equippedAccessories: ['flower', 'bow'] },
    { id: 'c3', displayName: 'DebugMaster', nametagStyle: 'default', characterId: 'poorcheapboy', equippedAccessories: ['coin'] },
    { id: 'c4', displayName: 'StackOverflow', nametagStyle: 'default', characterId: 'default', equippedAccessories: ['leaf'] },
    { id: 'c5', displayName: 'GitWizard', nametagStyle: 'default', characterId: 'poorcheapgirl', equippedAccessories: [] },
  ],
  design: [
    { id: 'd1', displayName: 'PixelPerfect', nametagStyle: 'crown', characterId: 'expensivegirl', equippedAccessories: ['hearts', 'flower'] },
    { id: 'd2', displayName: 'UIQueen', nametagStyle: 'gold', characterId: 'expensiveboy', equippedAccessories: ['star'] },
    { id: 'd3', displayName: 'ColorTheory', nametagStyle: 'default', characterId: 'poorcheapgirl', equippedAccessories: ['heart', 'leaf'] },
    { id: 'd4', displayName: 'TypeNerd', nametagStyle: 'default', characterId: 'default', equippedAccessories: ['bonsai'] },
    { id: 'd5', displayName: 'LayoutPro', nametagStyle: 'default', characterId: 'poorcheapboy', equippedAccessories: ['chicken'] },
  ],
}

const COLLEGE_PEOPLE: Record<string, Omit<LeaderboardEntry, 'rank' | 'points'>[]> = {
  'state-u': [
    { id: 's1', displayName: 'StateStar', nametagStyle: 'crown', characterId: 'expensiveboy', equippedAccessories: ['coin', 'star'] },
    { id: 's2', displayName: 'CampusLegend', nametagStyle: 'gold', characterId: 'expensivegirl', equippedAccessories: ['hearts'] },
    { id: 's3', displayName: 'LibraryOwl', nametagStyle: 'default', characterId: 'poorcheapboy', equippedAccessories: ['flower'] },
    { id: 's4', displayName: 'StudyBuddy', nametagStyle: 'default', characterId: 'default', equippedAccessories: ['heart'] },
    { id: 's5', displayName: 'MidnightCram', nametagStyle: 'default', characterId: 'poorcheapgirl', equippedAccessories: ['leaf', 'bow'] },
  ],
  'tech-institute': [
    { id: 't1', displayName: 'TechLead', nametagStyle: 'crown', characterId: 'expensiveboy', equippedAccessories: ['bonsai', 'hearts'] },
    { id: 't2', displayName: 'ByteSize', nametagStyle: 'gold', characterId: 'expensivegirl', equippedAccessories: ['star', 'flower'] },
    { id: 't3', displayName: 'LambdaLord', nametagStyle: 'default', characterId: 'poorcheapboy', equippedAccessories: ['chicken'] },
    { id: 't4', displayName: 'FlowSeeker', nametagStyle: 'default', characterId: 'default', equippedAccessories: [] },
    { id: 't5', displayName: 'DeepWork', nametagStyle: 'default', characterId: 'poorcheapgirl', equippedAccessories: ['coin'] },
  ],
}

export function Leaderboard() {
  const { profile, setCommunity, setCollege } = usePoints()
  const [scope, setScope] = useState<'community' | 'college'>('community')
  const [communityId, setCommunityId] = useState<string | null>(profile.communityId)
  const [collegeId, setCollegeId] = useState<string | null>(profile.collegeId)
  const [hoverId, setHoverId] = useState<string | null>(null)

  const entries = useMemo((): LeaderboardEntry[] => {
    const people =
      scope === 'community' && communityId && COMMUNITY_PEOPLE[communityId]
        ? COMMUNITY_PEOPLE[communityId]
        : scope === 'college' && collegeId && COLLEGE_PEOPLE[collegeId]
          ? COLLEGE_PEOPLE[collegeId]
          : scope === 'community'
            ? COMMUNITY_PEOPLE['cs-101']
            : COLLEGE_PEOPLE['state-u']
    const withPoints = people.map((p, i) => ({
      ...p,
      points: Math.max(0, profile.points - 50 - i * 55 + (i * 17 % 30)),
    }))
    const youEntry: LeaderboardEntry = {
      id: 'you',
      displayName: profile.displayName,
      points: profile.points,
      rank: 0,
      nametagStyle: profile.nametagStyle,
      characterId: profile.characterId,
      equippedAccessories: profile.equippedAccessories,
    }
    const combined = [youEntry, ...withPoints]
    const sorted = [...combined].sort((a, b) => b.points - a.points)
    return sorted.map((e, i) => ({ ...e, rank: i + 1 }))
  }, [scope, communityId, collegeId, profile.points, profile.displayName, profile.nametagStyle, profile.characterId, profile.equippedAccessories])

  const saveCommunity = (id: string | null) => {
    setCommunityId(id)
    setCommunity(id)
  }
  const saveCollege = (id: string | null) => {
    setCollegeId(id)
    setCollege(id)
  }

  const hoverEntry = hoverId ? entries.find((e) => e.id === hoverId) : null

  return (
    <div className="leaderboard">
      <div className="leaderboard__card">
        <h2 className="leaderboard__title">Leaderboard</h2>
        <div className="leaderboard__tabs">
          <button
            className={`leaderboard__tab ${scope === 'community' ? 'active' : ''}`}
            onClick={() => setScope('community')}
          >
            Community
          </button>
          <button
            className={`leaderboard__tab ${scope === 'college' ? 'active' : ''}`}
            onClick={() => setScope('college')}
          >
            College
          </button>
        </div>
        {scope === 'community' && (
          <div className="leaderboard__select">
            <label>Community</label>
            <select
              value={communityId ?? ''}
              onChange={(e) => saveCommunity(e.target.value || null)}
              className="leaderboard__dropdown"
            >
              <option value="">Select community</option>
              {MOCK_COMMUNITIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        )}
        {scope === 'college' && (
          <div className="leaderboard__select">
            <label>College</label>
            <select
              value={collegeId ?? ''}
              onChange={(e) => saveCollege(e.target.value || null)}
              className="leaderboard__dropdown"
            >
              <option value="">Select college</option>
              {MOCK_COLLEGES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        )}
        <ul className="leaderboard__list">
          {entries.map((e) => (
            <li
              key={e.id}
              className={`leaderboard__row ${e.id === 'you' ? 'you' : ''}`}
              onMouseEnter={() => setHoverId(e.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              <span className="leaderboard__rank">#{e.rank}</span>
              <span className={`leaderboard__name nametag nametag--${e.nametagStyle}`}>
                {e.rank === 1 && (e.nametagStyle === 'crown' || e.nametagStyle === 'gold') && (
                  <span className="nametag__icon">👑</span>
                )}
                {e.displayName}
              </span>
              <span className="leaderboard__pts">{e.points} pts</span>
              {hoverEntry?.id === e.id && (
                <div className="leaderboard__popup">
                  <CharacterDisplay
                    characterId={e.characterId}
                    equippedAccessories={e.equippedAccessories}
                    scale={1.25}
                  />
                  <span className="leaderboard__popup-name">{e.displayName}</span>
                  <span className="leaderboard__popup-pts">{e.points} pts</span>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="leaderboard__hint">Hover over a row to see their character. Top ranks can show a crown or gold nameplate.</p>
      </div>
    </div>
  )
}
