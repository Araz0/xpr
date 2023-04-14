import { memo, useEffect, useRef } from 'react'

import styled from 'styled-components'

import { Typography, CircularProgress } from '@mui/material'
import { StandbyOverlay } from 'components/StandbyOverlay'
import { VideoPlayer } from 'components/VideoPlayer'

import { useDoubleKeyPress } from 'hooks'
import { ScreenService, SocketService, useScreenService } from 'services'
import { useScreenStore } from 'stores'
import { StandByMods } from 'types'

const StyledScreenPlayerContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  video {
    position: absolute;
  }
`
export type ScreenProps = {
  screenId: number
  screenService: ScreenService
  backgroundColor?: string
  muted?: boolean
  socketService?: SocketService
}

export const ScreenRaw = ({
  screenId,
  screenService,
  backgroundColor,
  muted,
  socketService,
}: ScreenProps) => {
  const programStarted = useScreenStore((s) => s.programStarted)
  const standByMode = useScreenStore((s) => s.standByMode)
  const program = useScreenStore((s) => s.program)
  const playerContainerRef = useRef<any>()
  const videoRef1 = useRef<any>()
  const videoRef2 = useRef<any>()

  const { init, requestFullScreen, requestShowControls, setScerenListeners } =
    useScreenService(screenService, socketService)

  useDoubleKeyPress('f', () => requestFullScreen())
  useDoubleKeyPress('c', () => requestShowControls())

  useEffect(() => {
    init(screenId, playerContainerRef, videoRef1, videoRef2)
    setScerenListeners()
  }, [init, screenId, setScerenListeners])

  return (
    <StyledScreenPlayerContainer ref={playerContainerRef}>
      {!programStarted && (
        <StandbyOverlay backgroundColor={backgroundColor}>
          {standByMode === StandByMods.TEXT && (
            <Typography>
              {program?.media[screenId]
                ? `Program (${program.title}) is set, waiting on your command to
              start!`
                : `No media found on screen id ${screenId}`}
            </Typography>
          )}
          {standByMode === StandByMods.ANIMATION && <CircularProgress />}
        </StandbyOverlay>
      )}
      <>
        <VideoPlayer reference={videoRef1} muted={muted} />
        <VideoPlayer reference={videoRef2} muted={muted} />
      </>
    </StyledScreenPlayerContainer>
  )
}

export const Screen = memo(ScreenRaw)
