import { memo, useCallback } from 'react'

import styled from 'styled-components'

import {
  AccountTree,
  Airplay,
  Backspace,
  Fullscreen,
  PlayArrow,
  Stop,
} from '@mui/icons-material'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'

import {
  AdminPageWrapper,
  LoadingAnimation,
  LoadLocalProgramButton,
  ProgramsList,
} from '../../components'
import { useSocketService } from '../../services'
import { useAdminStore } from '../../stores'

const StyledActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`

export const AdminPageRaw = () => {
  const selectedProgram = useAdminStore((s) => s.selectedProgram)
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const {
    emmitProgram,
    emmitStartProgram,
    emmitStopProgram,
    emmitEndStandby,
    emmitRequestFullscreen,
  } = useSocketService()

  const handelSendProgram = useCallback(() => {
    if (!selectedProgram) return
    emmitProgram(selectedProgram)
  }, [emmitProgram, selectedProgram])

  return (
    <AdminPageWrapper topNavActions={<LoadLocalProgramButton />}>
      {selectedProgram !== undefined ? (
        <>
          <Typography variant="button">
            {`Selected Program: ${selectedProgram.title}`}
            <Tooltip title="deselect program">
              <IconButton onClick={() => setSelectedProgram(undefined)}>
                <Backspace />
              </IconButton>
            </Tooltip>
          </Typography>

          <StyledActionsContainer>
            <Button
              variant="contained"
              onClick={handelSendProgram}
              startIcon={<AccountTree />}
            >
              Send Program
            </Button>
            <Button
              variant="contained"
              onClick={emmitEndStandby}
              startIcon={<Airplay />}
            >
              End Standby mode
            </Button>
            <Button
              variant="contained"
              onClick={emmitRequestFullscreen}
              startIcon={<Fullscreen />}
            >
              Request Fullscreen
            </Button>
            <Button
              variant="contained"
              onClick={emmitStartProgram}
              startIcon={<PlayArrow />}
            >
              Start program
            </Button>
            <Button
              variant="contained"
              onClick={emmitStopProgram}
              startIcon={<Stop />}
            >
              Stop program
            </Button>
          </StyledActionsContainer>
        </>
      ) : loadedPrograms === undefined ? (
        <LoadingAnimation />
      ) : (
        <ProgramsList
          programs={loadedPrograms}
          navigateToPath="/admin/programs"
        />
      )}
    </AdminPageWrapper>
  )
}

export const AdminPage = memo(AdminPageRaw)
