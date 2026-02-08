import React, { useState } from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk'
import './StudyCall.css'

export function StudyCall() {
  const [inCall, setInCall] = useState(false)

  return (
    <div className="study-call">
      {!inCall ? (
        <div className="study-call__card">
          <h2 className="study-call__title">Study Call</h2>
          <p className="study-call__desc">Join a video call with your study group</p>
          <button className="study-call__join" onClick={() => setInCall(true)}>
            Enter Study Call
          </button>
        </div>
      ) : (
        <div className="study-call__video-wrap">
          <JitsiMeeting
            roomName="StudyCall"
            configOverwrite={{
              startWithAudioMuted: true,
              disableThirdPartyRequests: true,
              prejoinPageEnabled: false,
            }}
            interfaceConfigOverwrite={{
              TOOLBAR_BUTTONS: [
                'microphone',
                'camera',
                'closedcaptions',
                'desktop',
                'fullscreen',
                'fodeviceselection',
                'hangup',
                'profile',
                'chat',
                'recording',
                'livestreaming',
                'etherpad',
                'sharedvideo',
                'settings',
                'raisehand',
                'videoquality',
                'filmstrip',
                'feedback',
                'stats',
                'shortcuts',
                'tileview',
                'videobackgroundblur',
                'download',
                'help',
                'mute-everyone',
                'security',
              ],
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100%'
            }}
            onApiReady={(externalApi) => {
              externalApi.addEventListener('videoConferenceLeft', () => {
                setInCall(false)
              })
            }}
          />
        </div>
      )}
    </div>
  )
}
