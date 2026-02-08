import React, { useState } from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk'
import './StudyCall.css'

export function StudyCall() {
  const [view, setView] = useState<'menu' | 'input' | 'call'>('menu')
  const [roomName, setRoomName] = useState('')
  const [inputValue, setInputValue] = useState('')

  const startCall = (name: string) => {
    setRoomName(name)
    setView('call')
  }

  const handleJoinGlobal = () => {
    startCall('StudyCall')
  }

  const handleCreateNew = () => {
    // Generate a random room ID
    const randomId = Math.random().toString(36).substring(2, 9)
    startCall(`FlowState-${randomId}`)
  }

  const handleJoinViaLink = () => {
    setView('input')
    setInputValue('')
  }

  const submitLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Extract room name if user pasted a full URL (e.g., https://meet.jit.si/RoomName)
    let name = inputValue.trim()
    try {
      const url = new URL(name)
      const path = url.pathname.split('/').filter(Boolean).pop()
      if (path) name = path
    } catch (_) {
      // Not a URL, use the text as is
    }
    startCall(name)
  }

  return (
    <div className="study-call">
      {view === 'menu' && (
        <div className="study-call__card">
          <h2 className="study-call__title">Study Together</h2>
          <p className="study-call__desc">Choose how you want to study</p>
          
          <div className="study-call__menu">
            <button className="study-call__btn primary" onClick={handleJoinGlobal}>
              Join Global Room
            </button>
            <button className="study-call__btn" onClick={handleCreateNew}>
              Create New Meeting
            </button>
            <button className="study-call__btn" onClick={handleJoinViaLink}>
              Join with Link
            </button>
          </div>
        </div>
      )}

      {view === 'input' && (
        <div className="study-call__card">
          <h2 className="study-call__title">Join Meeting</h2>
          <p className="study-call__desc">Paste a Jitsi link or enter a room name</p>
          
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
              <button type="button" className="study-call__btn small" onClick={() => setView('menu')}>
                Back
              </button>
              <button type="submit" className="study-call__btn primary small">
                Join
              </button>
            </div>
          </form>
        </div>
      )}

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