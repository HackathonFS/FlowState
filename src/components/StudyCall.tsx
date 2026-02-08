import React, { useState } from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk'
import type { TabId } from '../types'
import './StudyCall.css'

type ViewState = 'menu' | 'input-link' | 'input-subject' | 'input-task' | 'call'

type StudyCallProps = {
  onNavigate: (tab: TabId) => void
}

export function StudyCall({ onNavigate }: StudyCallProps) {
  const [view, setView] = useState<ViewState>('menu')
  const [roomName, setRoomName] = useState('')
  const [inputValue, setInputValue] = useState('')

  const startCall = (name: string) => {
    // Sanitize room name to be URL-safe (replace spaces with dashes)
    const safeName = name.replace(/\s+/g, '-')
    setRoomName(safeName)
    setView('call')
  }

  // --- Menu Actions ---

  const handleIndependent = () => {
    // Redirect to the internal Pomodoro Timer page
    onNavigate('pomodoro')
  }

  const handleCommunity = () => {
    // The main general room mapped to Community
    startCall('Community')
  }

  const handleSubject = () => {
    setInputValue('')
    setView('input-subject')
  }

  const handleTask = () => {
    // Redirects "Similar Tasks" directly to the Community call
    startCall('Community')
  }

  const handleCreateNew = () => {
    const randomId = Math.random().toString(36).substring(2, 9)
    startCall(`FlowState-Room-${randomId}`)
  }

  const handleJoinViaLink = () => {
    setInputValue('')
    setView('input-link')
  }

  // --- Form Submissions ---

  const submitSubject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    // Direct link to the subject name (e.g. Math -> https://meet.jit.si/Math)
    startCall(inputValue.trim())
  }

  const submitTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    startCall(`FlowState-Task-${inputValue.trim()}`)
  }

  const submitLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    let name = inputValue.trim()
    try {
      // If user pasted a full URL, extract the room name
      const url = new URL(name)
      const path = url.pathname.split('/').filter(Boolean).pop()
      if (path) name = path
    } catch (_) {
      // Not a URL, use text as is
    }
    startCall(name)
  }

  const goBack = () => setView('menu')

  return (
    <div className="study-call">
      {view === 'menu' && (
        <div className="study-call__card">
          <h2 className="study-call__title">Study Together</h2>
          <p className="study-call__desc">Select a meeting category to join a pod</p>
          
          <div className="study-call__menu">
            <p className="study-call__category-label">Meeting categories</p>
            <div className="study-call__categories">
              <button className="study-call__btn primary" onClick={handleCommunity}>
                𖠋𖠋 Study as a Community
              </button>
              <button className="study-call__btn" onClick={handleIndependent}>
                𐀪 Independent Study (Silent)
              </button>
              <button className="study-call__btn" onClick={handleSubject}>
                ✎ᝰ. Specific Subject...
              </button>
              <button className="study-call__btn" onClick={handleTask}>
                ✔ Similar Tasks...
              </button>
            </div>

            <div className="study-call__divider" />
            <p className="study-call__category-label">More options</p>
            <div className="study-call__actions">
              <button className="study-call__btn small" onClick={handleCreateNew}>
                + Create New
              </button>
              <button className="study-call__btn small" onClick={handleJoinViaLink}>
                Join Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input View: Specific Subject */}
      {view === 'input-subject' && (
        <div className="study-call__card">
          <h2 className="study-call__title">Specific Subject</h2>
          <p className="study-call__desc">What subject are you studying?</p>
          <form onSubmit={submitSubject} className="study-call__form">
            <input
              className="study-call__input"
              type="text"
              placeholder="e.g. Math, History, Physics"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <div className="study-call__actions">
              <button type="button" className="study-call__btn small" onClick={goBack}>Back</button>
              <button type="submit" className="study-call__btn primary small">Join Room</button>
            </div>
          </form>
        </div>
      )}

      {/* Input View: Similar Tasks */}
      {view === 'input-task' && (
        <div className="study-call__card">
          <h2 className="study-call__title">Similar Tasks</h2>
          <p className="study-call__desc">What kind of task are you doing?</p>
          <form onSubmit={submitTask} className="study-call__form">
            <input
              className="study-call__input"
              type="text"
              placeholder="e.g. Coding, Writing, Reading"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <div className="study-call__actions">
              <button type="button" className="study-call__btn small" onClick={goBack}>Back</button>
              <button type="submit" className="study-call__btn primary small">Find Pod</button>
            </div>
          </form>
        </div>
      )}

      {/* Input View: Link */}
      {view === 'input-link' && (
        <div className="study-call__card">
          <h2 className="study-call__title">Join with Link</h2>
          <p className="study-call__desc">Paste a Jitsi link or room name</p>
          <form onSubmit={submitLink} className="study-call__form">
            <input
              className="study-call__input"
              type="text"
              placeholder="https://meet.jit.si/..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <div className="study-call__actions">
              <button type="button" className="study-call__btn small" onClick={goBack}>Back</button>
              <button type="submit" className="study-call__btn primary small">Join</button>
            </div>
          </form>
        </div>
      )}

      {/* Active Call View */}
      {view === 'call' && (
        <div className="study-call__video-wrap">
          <JitsiMeeting
            roomName={roomName}
            configOverwrite={{
              startWithAudioMuted: true,
              disableThirdPartyRequests: true,
              prejoinPageEnabled: false,
            }}
            interfaceConfigOverwrite={{
               TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
              ],
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100%'
            }}
            onApiReady={(externalApi) => {
              externalApi.addEventListener('videoConferenceLeft', () => {
                setView('menu')
                setRoomName('')
              })
            }}
          />
        </div>
      )}
    </div>
  )
}
