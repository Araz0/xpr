import styled from 'styled-components'

import { Story } from '@storybook/react'

import { ScreenPreview } from './ScreenPreview'

const StyledContainer = styled.div`
  position: relaitve;
  width: 100vw;
  height: 100vh;
`
export const Default: Story = (args) => {
  return (
    <StyledContainer>
      <ScreenPreview title="First Screen" screenId={0} />
    </StyledContainer>
  )
}
Default.args = {}
Default.storyName = 'ScreenPreview'

export default {
  title: 'ScreenPreview',
}