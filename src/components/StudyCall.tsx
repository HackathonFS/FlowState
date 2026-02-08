import React, { useState, useEffect } from 'react'
import { DailyProvider, useCallObject, useParticipantIds, useVideoTrack } from '@daily-co/daily-react'
import DailyIframe from '@daily-co/daily-js'
import './StudyCall.css'

const DEMO_ROOM_URL = 'https://flowstate.daily.co/Study'

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

function CallContent() {
  const callObject = useCallObject()
  const participantIds = useParticipantIds()

  useEffect(() => {
    if (!callObject) return
    callObject.join({ url: DEMO_ROOM_URL }).catch(console.error)
    return () => { callObject.leave() }
  }, [callObject])

  return (
    <div className="study-video-grid">
      {participantIds.map((id) => (
        <VideoTile key={id} participantId={id} />
      ))}
      {participantIds.length === 0 && <p className="waiting-text">Connecting...</p>}
    </div>
  )
}

export function StudyCall() {
  const [inCall, setInCall] = useState(false)
  const [callObject, setCallObject] = useState<ReturnType<typeof DailyIframe.createCallObject> | null>(null)

  const startCall = () => {
    const newCallObject = DailyIframe.createCallObject()
    setCallObject(newCallObject)
    setInCall(true)
  }

  const leaveCall = () => {
    callObject?.destroy()
    setCallObject(null)
    setInCall(false)
  }

  if (inCall && callObject) {
    return (
      <DailyProvider callObject={callObject}>
        <div className="study-call study-call--active">
          <CallContent />
          <button className="study-call__leave" onClick={leaveCall}>Leave call</button>
        </div>
      </DailyProvider>
    )
  }

  return (
    <div className="study-call">
      <div className="study-call__card">
        <h2 className="study-call__title">Study call</h2>
        <button className="study-call__join" onClick={startCall}>Join call</button>
      </div>
    </div>
  )
}
