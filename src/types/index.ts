export * from './eventNames'

export type ProgramType = {
  id: number
  discription: string
  thumbnail: string
  title: string
  segments: SegmentType[]
  media: SegmentMediaType[]
  screensInfo: ProgramScreensInfo[]
  standBySrc?: string
  meta?: ProgramMeta
}
export type ProgramMeta = {
  estimatedTime?: string
}
export type ProgramScreensInfo = {
  title: string
}
export type SegmentType = {
  id: number
  isIntro?: boolean
  mediaId: number
  nextSegmentIds?: number[]
}

export type SegmentMediaType = {
  id: number
  title: string
  description: string
  screens: ScreenType[]
  globalAudio?: string
}

export type ScreenType = {
  id: number
  title: string
  mediaSrc: string
}

export type VideoRefElementType = React.RefObject<HTMLVideoElement> | undefined
export type PlayerContainerType = React.RefObject<HTMLDivElement> | undefined

export type DbProgram = {
  id: number
  internal_id: number
  program: ProgramType
  user_id: string
}

export enum ScreenStatus {
  EMPTY = 'EMPTY',
  HAS_PROGRAM = 'HAS_PROGRAM',
  STAND_BY = 'STAND_BY',
  PLAYING = 'PLAYING',
  VOTING = 'VOTING',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}

export enum StandByMods {
  ANIMATION = 'ANIMATION',
  TEXT = 'TEXT',
}

export type LogType = {
  title: string
  description: string
}
