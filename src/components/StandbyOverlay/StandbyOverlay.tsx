import { memo } from 'react'

import styled from 'styled-components'

const StyledCenterContainer = styled.div`
  flex: 1;
  display: grid;
  justify-items: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(1, 0, 0, 1);
`

const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  width: fit-content;
  height: fit-content;
`
export type StandbyOverlayProps = {
  children: React.ReactNode
}
export const StandbyOverlayRaw = ({ children }: StandbyOverlayProps) => {
  return (
    <StyledCenterContainer>
      <StyledActionsContainer>{children}</StyledActionsContainer>
    </StyledCenterContainer>
  )
}
export const StandbyOverlay = memo(StandbyOverlayRaw)