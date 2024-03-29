import { createTheme } from '@mui/material'

export const PRIMARY_COLOR = '#0368FF'
export const PRIMARY_COLOR_HOVERD = '#5899FF'
export const SECONDARY_COLOR = '#FF3E95'
export const SECONDARY_COLOR_HOVERD = '#FF74B2'
export const PRIMARY_GRADIENT = 'rgba(3,104,255,1) 0%, rgba(255,62,149,1) 100%'
export const BACKGROUND_COLOR_SECONDERY = '#221C3E'
export const BACKGROUND_COLOR_PRIMERY = '#0F0920'
export const WHITE_COLOR = '#F2F0FF'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
