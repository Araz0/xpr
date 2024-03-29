import { useCallback, useEffect } from 'react'

import { createClient } from '@supabase/supabase-js'
import {
  PROGRAM_THUMBNAILS_BUCKET,
  UPLOADS_FOLDER_PATH,
} from 'constants/supabase'

import { useAdminStore } from 'stores'
import { DbProgram, ProgramType } from 'types'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''

const supabaseClient = createClient(supabaseUrl, supabaseKey)

export function useSupabase() {
  const setLoadedPrograms = useAdminStore((s) => s.setLoadedPrograms)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const loggedInUser = useAdminStore((s) => s.loggedInUser)
  const setLoggedInUser = useAdminStore((s) => s.setLoggedInUser)
  const setUserIsLoggedIn = useAdminStore((s) => s.setUserIsLoggedIn)
  const userIsLoggedIn = useAdminStore((s) => s.userIsLoggedIn)

  const handleUploadProgramThubmnail = useCallback(
    async (event: { target: { files: any[] } }) => {
      const file = event.target.files[0]
      if (!file) return null
      if (!loggedInUser) return null

      const { data } = await supabaseClient.storage
        .from(PROGRAM_THUMBNAILS_BUCKET)
        .upload(loggedInUser.id + '/' + Date.now(), file)

      if (data) {
        return UPLOADS_FOLDER_PATH + '/' + data.path
      } else {
        return null
      }
    },
    [loggedInUser]
  )

  const loadAllPrograms = useCallback(async () => {
    if (!userIsLoggedIn) return
    const { data, error } = await supabaseClient.from('programs').select('*')
    if (error) throw error
    setLoadedPrograms(data as DbProgram[])
    return data as DbProgram[]
  }, [setLoadedPrograms, userIsLoggedIn])

  const insertProgram = useCallback(
    async (program: ProgramType) => {
      if (!loggedInUser) return
      const { error } = await supabaseClient.from('programs').insert({
        internal_id: program.id,
        program: program,
        user_id: loggedInUser.id,
      })

      if (error) throw error
      loadAllPrograms()
    },
    [loggedInUser, loadAllPrograms]
  )
  const getProgramById = useCallback(
    async (Id: string) => {
      if (!userIsLoggedIn) return
      const { data, error } = await supabaseClient
        .from('programs')
        .select('program')
        .eq('internal_id', Id)
        .single()

      if (error) throw error

      return data.program
    },
    [userIsLoggedIn]
  )

  const loadProgramsByUser = useCallback(async () => {
    if (!loggedInUser) return
    const { data, error } = await supabaseClient
      .from('programs')
      .select('*')
      .eq('user_id', loggedInUser.id)

    if (error) throw error
    setLoadedPrograms(data as DbProgram[])
    return data as DbProgram[]
  }, [setLoadedPrograms, loggedInUser])

  const getUserData = useCallback(async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    if (!user) return
    setLoggedInUser(user)
    return user
  }, [setLoggedInUser])

  const signInViaMagicLink = useCallback(async (email: string) => {
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email: email,
    })
    if (error) throw error
    return data
  }, [])

  const signInWithGitHub = useCallback(async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error) throw error
    return data
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  }, [])

  const deleteProgram = useCallback(
    async (programId: number) => {
      if (!loggedInUser) return
      const { error } = await supabaseClient
        .from('programs')
        .delete()
        .eq('internal_id', programId)

      if (error) throw error
      loadAllPrograms()
    },
    [loggedInUser, loadAllPrograms]
  )

  const updateProgram = useCallback(
    async (program: ProgramType) => {
      if (!loggedInUser) return
      const { error } = await supabaseClient
        .from('programs')
        .update({ program: program })
        .eq('internal_id', program.id)

      if (error) throw error
      loadAllPrograms()
    },
    [loggedInUser, loadAllPrograms]
  )

  const handleUpdateProgramInDb = useCallback(
    (program: ProgramType) => {
      if (!userIsLoggedIn) return
      if (!program) return
      const programIdExist = loadedPrograms?.some(
        (item) => item.program.id === program.id
      )
      if (programIdExist) {
        updateProgram(program)
      } else {
        insertProgram(program)
      }
    },
    [insertProgram, loadedPrograms, updateProgram, userIsLoggedIn]
  )

  useEffect(() => {
    if (!loadedPrograms) loadProgramsByUser()
  }, [loadProgramsByUser, loadedPrograms])

  const checkUserLogin = useCallback(() => {
    if (!loggedInUser) {
      getUserData()
    } else {
      if (loggedInUser?.role === 'authenticated') {
        setUserIsLoggedIn(true)
      } else {
        setUserIsLoggedIn(false)
      }
    }

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event !== 'SIGNED_OUT') {
        // success
        setUserIsLoggedIn(true)
        setLoggedInUser(session?.user)
      } else {
        // did not work
        setUserIsLoggedIn(false)
        setLoggedInUser(undefined)
      }
    })
  }, [getUserData, loggedInUser, setLoggedInUser, setUserIsLoggedIn])

  return {
    supabaseClient,
    insertProgram,
    getProgramById,
    loadAllPrograms,
    loadProgramsByUser,
    getUserData,
    signInViaMagicLink,
    signInWithGitHub,
    signOut,
    deleteProgram,
    updateProgram,
    handleUploadProgramThubmnail,
    handleUpdateProgramInDb,
    checkUserLogin,
  }
}
