import { memo, useCallback, useState } from 'react'

import styled from 'styled-components'

import { AspectRatio } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { BorderdContainer } from 'components/BorderdContainer'
import { Screen } from 'components/Screen/Screen'
import { BACKGROUND_COLOR_SECONDERY, WHITE_COLOR } from 'constants/styles'

import { ScreenService, SocketService } from 'services'

const StyledPreviewContainer = styled.div<{ isFullScreen: boolean }>`
  position: relative;
  height: ${(props) => (props.isFullScreen ? '100%' : '310px')};
  width: ${(props) => (props.isFullScreen ? '100%' : '555px')};

  background-color: ${BACKGROUND_COLOR_SECONDERY};
  border-radius: 10px;
  display: flex;
  overflow: hidden;
`

const StyledFooterContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;

  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;

  z-index: 100;

  border-radius: 0 0 10px 10px;
  color: ${WHITE_COLOR};
  button {
    color: ${WHITE_COLOR};
  }
  > :first-child {
    margin-left: 13px;
  }
  > :last-child {
    margin-right: 5px;
  }
`
export type ScreenPreviewProps = {
  title: string
  screenId: number
  screenService: ScreenService
  muted?: boolean
  socketService?: SocketService
}
export const ScreenPreviewRaw = ({
  title,
  screenId,
  screenService,
  muted,
  socketService,
}: ScreenPreviewProps) => {
  const [isFullScreen, setIsFullscreen] = useState<boolean>(false)

  const handleOnClick = useCallback(() => {
    setIsFullscreen(!isFullScreen)
  }, [isFullScreen])

  return (
    <BorderdContainer
      padding="0"
      fitContent={!isFullScreen}
      hotBorder={isFullScreen}
      onClick={handleOnClick}
      isFullScreen={isFullScreen}
    >
      <StyledPreviewContainer isFullScreen={isFullScreen}>
        <Screen
          screenId={screenId}
          screenService={screenService}
          backgroundColor={BACKGROUND_COLOR_SECONDERY}
          muted={muted ? true : false}
          socketService={socketService}
        />
        <StyledFooterContainer>
          <span>{title}</span>
          <IconButton size="small" onClick={handleOnClick}>
            <AspectRatio />
          </IconButton>
        </StyledFooterContainer>
      </StyledPreviewContainer>
    </BorderdContainer>
  )
}

export const ScreenPreview = memo(ScreenPreviewRaw)
