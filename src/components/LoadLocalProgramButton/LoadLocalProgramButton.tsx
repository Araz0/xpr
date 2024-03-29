import { memo, useCallback, useRef } from 'react'

import { DownloadOutlined, FileOpen } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { MainButton, MainButtonVariants } from 'components/MainButton'

import { useProgram } from 'hooks'

export type LoadLocalProgramButtonProps = {
  smallVariant?: boolean
}
export const LoadLocalProgramButtonRaw = ({
  smallVariant,
}: LoadLocalProgramButtonProps) => {
  const { loadJsonProgram } = useProgram()
  const inputFile = useRef<HTMLInputElement | null>(null)

  const handleOnClick = useCallback(() => {
    inputFile.current?.click()
  }, [])

  const handleImportJsonProgram = useCallback(
    (e: any) => {
      loadJsonProgram('/localPrograms/' + e.target.files[0].name)
    },
    [loadJsonProgram]
  )
  if (smallVariant)
    return (
      <IconButton component="label">
        <input
          hidden
          accept="application/json"
          type="file"
          onChange={handleImportJsonProgram}
        />
        <FileOpen />
      </IconButton>
    )

  return (
    <MainButton
      onClick={handleOnClick}
      width={'fit-contnet'}
      startIcon={<DownloadOutlined />}
      variant={MainButtonVariants.PRIMARY}
    >
      Import Program
      <input
        hidden
        accept="application/json"
        type="file"
        onChange={handleImportJsonProgram}
        ref={inputFile}
        style={{ display: 'none' }}
      />
    </MainButton>
  )
}

export const LoadLocalProgramButton = memo(LoadLocalProgramButtonRaw)
