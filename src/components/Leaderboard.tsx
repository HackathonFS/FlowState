import React, { useState } from 'react'
import { usePoints } from '../context/PointsContext'
import type { NametagStyle } from '../types'
import './Leaderboard.css'

const MOCK_COMMUNITIES = [
  { id: 'cs-101', name: 'CS 101 Study Group', memberCount: 24 },
  { id: 'design', name: 'Design Squad', memberCount: 12 },
]
const MOCK_COLLEGES = [
  { id: 'state-u', name: 'State University' },
  { id: 'tech-institute', name: 'Tech Institute' },
]

// Mock leaderboard entries (in a real app, fetch from backend)
function useMockLeaderboard(communityId: string | null, collegeId: string | null) {
  const { profile } = usePoints()
  const mock: Array<{ id: string; displayName: string; points: number; rank: number; nametagStyle: NametagStyle }> = [
    { id: '1', displayName: profile.displayName, points: profile.points, rank: 1, nametagStyle: profile.nametagStyle },
    { id: '2', displayName: 'StudyBuddy', points: Math.max(0, profile.points - 50), rank: 2, nametagStyle: 'gold' },
    { id: '3', displayName: 'FocusMaster', points: Math.max(0, profile.points - 120), rank: 3, nametagStyle: 'default' },
    { id: '4', displayName: 'DeepWork', points: Math.max(0, profile.points - 200), rank: 4, nametagStyle: 'default' },
    { id: '5', displayName: 'FlowSeeker', points: Math.max(0, profile.points - 280), rank: 5, nametagStyle: 'crown' },
  ].sort((a, b) => b.points - a.points)
  mock.forEach((e, i) => { e.rank = i + 1 })
  return mock
}

export function Leaderboard() {
  const { profile, setCommunity, setCollege } = usePoints()
  const [scope, setScope] = useState<'community' | 'college'>('community')
  const [communityId, setCommunityId] = useState<string | null>(profile.communityId)
  const [collegeId, setCollegeId] = useState<string | null>(profile.collegeId)
  const entries = useMockLeaderboard(communityId, collegeId)

  const saveCommunity = (id: string | null) => {
    setCommunityId(id)
    setCommunity(id)
  }
  const saveCollege = (id: string | null) => {
    setCollegeId(id)
    setCollege(id)
  }

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
            <li key={e.id} className={`leaderboard__row ${e.displayName === profile.displayName ? 'you' : ''}`}>
              <span className="leaderboard__rank">#{e.rank}</span>
              <span className={`leaderboard__name nametag nametag--${e.nametagStyle}`}>
                {e.rank === 1 && (e.nametagStyle === 'crown' || e.nametagStyle === 'gold') && (
                  <span className="nametag__icon">👑</span>
                )}
                {e.displayName}
              </span>
              <span className="leaderboard__pts">{e.points} pts</span>
            </li>
          ))}
        </ul>
        <p className="leaderboard__hint">Top ranks can show a crown or gold nameplate. Unlock them with points in Character.</p>
      </div>
    </div>
  )
}
