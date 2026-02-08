import React, { useState, useEffect } from 'react'
import { DailyProvider, useCallObject, useParticipantIds, useVideoTrack } from '@daily-co/daily-react'
import DailyIframe from '@daily-co/daily-js'
import { PomodoroTimer } from './PomodoroTimer'
import './StudyCall.css'

// ----------------------------------------------------------------------
// 1. CONFIGURATION
// ----------------------------------------------------------------------
const DEMO_ROOM_URL = 'https://flowstate.daily.co/Study'

export type CallCategory = 'independent' | 'community' | 'subject' | 'similar'

const CALL_CATEGORIES: { id: CallCategory; label: string; desc: string; icon: string }[] = [
  { id: 'independent', label: 'Independent', desc: 'Quiet focus', icon: '🎧' },
  { id: 'community', label: 'Community', desc: 'Collaborate', icon: '👥' },
  { id: 'subject', label: 'Subject', desc: 'Math, CS, etc.', icon: '📚' },
]

// 🟢 NEW: Pre-selected embeddable tools (Hackathon friendly)
const STUDY_TOOLS = [
  { id: 'whiteboard', label: 'Whiteboard', icon: '🖍️', url: 'https://excalidraw.com/' },
  { id: 'lofi', label: 'Lofi Radio', icon: '🎵', url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1' },
  { id: 'notes', label: 'Shared Notes', icon: '📝', url: 'https://etherpad.mit.edu/p/flowstate-hackathon-notes?showControls=true&showChat=false' }
]

// ----------------------------------------------------------------------
// 2. VIDEO TILE
// ----------------------------------------------------------------------
function VideoTile({ participantId }: { participantId: string }) {
  const videoTrack = useVideoTrack(participantId)
  
  return (
    <div className="video-tile">
      {videoTrack.track ? (
        <video 
          autoPlay muted playsInline 
          ref={(el) => { if (el && videoTrack.track) el.srcObject = new MediaStream([videoTrack.track]) }}
        />
      ) : (
        <div className="video-tile__placeholder">Loading...</div>
      )}
      <div className="video-tile__name">{participantId === 'local' ? 'You' : 'Peer'}</div>
    </div>
  )
}

// ----------------------------------------------------------------------
// 3. CALL MANAGER
// ----------------------------------------------------------------------
function CallContent({ embeddedUrl }: { embeddedUrl: string | null }) {
  const callObject = useCallObject()
  const participantIds = useParticipantIds()

  useEffect(() => {
    if (!callObject) return
    callObject.join({ url: DEMO_ROOM_URL }).catch(console.error)
    return () => { callObject.leave() }
  }, [callObject])

  return (
    <div className={`study-content ${embeddedUrl ? 'study-content--split' : ''}`}>
      
      {/* 🟢 NEW: The Embedded Website Window */}
      {embeddedUrl && (
        <div className="study-embed-window">
           <iframe 
             src={embeddedUrl} 
             title="Study Tool" 
             className="study-iframe" 
             allow="camera; microphone; autoplay; encrypted-media; fullscreen;" // Allow permissions
           />
        </div>
      )}

      {/* The Video Grid (Shrinks if embed is open) */}
      <div className="study-video-grid">
        {participantIds.map((id) => (
          <VideoTile key={id} participantId={id} />
        ))}
        {participantIds.length === 0 && <p className="waiting-text">Connecting...</p>}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// 4. MAIN COMPONENT
// ----------------------------------------------------------------------
export function StudyCall() {
  const [inCall, setInCall] = useState(false)
  const [category, setCategory] = useState<CallCategory | null>(null)
  const [callObject, setCallObject] = useState<ReturnType<typeof DailyIframe.createCallObject> | null>(null)
  
  // 🟢 NEW: State for the embedded website
  const [activeTool, setActiveTool] = useState<string | null>(null)

  const startCall = (c: CallCategory) => {
    setCategory(c)
    const newCallObject = DailyIframe.createCallObject()
    setCallObject(newCallObject)
    setInCall(true)
  }

  const leaveCall = () => {
    callObject?.destroy()
    setCallObject(null)
    setInCall(false)
    setCategory(null)
    setActiveTool(null)
  }

  if (inCall && category && callObject) {
    return (
      <DailyProvider callObject={callObject}>
        <div className="study-call study-call--active">
          <div className="study-call__layout">
            
            {/* SIDEBAR */}
            <aside className="study-call__sidebar">
              <div className="study-call__category-badge">
                 {CALL_CATEGORIES.find((x) => x.id === category)?.icon} {category}
              </div>
              <div className="study-call__pomodoro">
                <PomodoroTimer />
              </div>

              {/* 🟢 NEW: Tools Menu */}
              <div className="study-tools-menu">
                <h4 style={{color: 'var(--gold)', fontSize: '0.8rem', marginBottom:'0.5rem'}}>STUDY TOOLS</h4>
                {STUDY_TOOLS.map(tool => (
                  <button 
                    key={tool.id}
                    className={`tool-btn ${activeTool === tool.url ? 'active' : ''}`}
                    onClick={() => setActiveTool(activeTool === tool.url ? null : tool.url)}
                  >
                    <span>{tool.icon} {tool.label}</span>
                  </button>
                ))}
              </div>

              <button className="study-call__leave" onClick={leaveCall}>Leave call</button>
            </aside>

            {/* MAIN CONTENT AREA */}
            <section className="study-call__video">
              <CallContent embeddedUrl={activeTool} />
            </section>
          </div>
        </div>
      </DailyProvider>
    )
  }

  return (
    <div className="study-call">
       {/* (This "Join" screen code remains unchanged from your previous version) */}
       <div className="study-call__card">
        <h2 className="study-call__title">Study call</h2>
        <p className="study-call__sub">Video call with shared Pomodoro. Pick a category.</p>
        <ul className="study-call__categories">
          {CALL_CATEGORIES.map((c) => (
            <li key={c.id} className="study-call__category">
              <button className="study-call__category-btn" onClick={() => startCall(c.id)}>
                <span className="study-call__category-icon">{c.icon}</span>
                <span className="study-call__category-label">{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
