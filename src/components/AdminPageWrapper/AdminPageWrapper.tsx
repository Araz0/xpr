import { memo, ReactNode, useCallback, useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Login, Logout, Send } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Logo } from 'components/Icons'
import { MainButton } from 'components/MainButton'

import { useSupabase } from 'hooks'
import { useAdminStore } from 'stores'

import { Popup } from '../Popup'

const StyledPageContainer = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 50px auto;
  gap: 0px 0px;
  grid-template-areas: 'topNav' 'mainContent';

  max-width: 1800px;
  margin: 0 auto;
`

const StyledTopNav = styled.div`
  padding: 10px 15px;
  grid-area: topNav;
  display: flex;
  justify-content: space-between;
  height: fit-content;
  padding: 10px 15px;
`

const StyledContentWrapper = styled.div`
  margin-top: 10px;
  grid-area: mainContent;
  padding: 0 15px;
  overflow: auto;

  display: flex;
  flex-direction: column;
`

const StyledSymbolContainer = styled.div`
  padding: 5px;
  text-align: center;
  width: 40px;
`
const StyledCenterActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`
const StyledRightActionsContainer = styled.div`
  display: flex;
`

export type AdminPageWrapperProps = {
  children: ReactNode
}
export const AdminPageWrapperRaw = ({ children }: AdminPageWrapperProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signOut } = useSupabase()
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)
  const userIsLoggedIn = useAdminStore((s) => s.userIsLoggedIn)
  const { checkUserLogin } = useSupabase()

  useEffect(() => {
    checkUserLogin()
  }, [checkUserLogin])

  const handleRequestLogout = useCallback(async () => {
    await signOut()
  }, [signOut])

  const handleOnLogoutClick = useCallback(() => {}, [])

  return (
    <StyledPageContainer>
      <StyledTopNav>
        <StyledSymbolContainer>
          <Logo />
        </StyledSymbolContainer>
        <StyledCenterActionsContainer>
          <MainButton
            onClick={() => navigate('/')}
            highlighted={location.pathname === '/'}
          >
            Menu
          </MainButton>
          <MainButton
            onClick={() => navigate('/admin')}
            highlighted={location.pathname === '/admin'}
          >
            Home
          </MainButton>
          <MainButton
            onClick={() => navigate('/admin/programs')}
            highlighted={location.pathname.includes('/admin/program')}
          >
            Programs
          </MainButton>
        </StyledCenterActionsContainer>
        <StyledRightActionsContainer>
          {userIsLoggedIn ? (
            <MainButton onClick={handleRequestLogout}>
              <Logout />
              Logout
            </MainButton>
          ) : (
            <MainButton onClick={() => navigate('/login')}>
              <Login />
              Login
            </MainButton>
          )}
        </StyledRightActionsContainer>
      </StyledTopNav>

      <StyledContentWrapper>{children}</StyledContentWrapper>
      {showLoginPopup && (
        <Popup
          onClose={() => setShowLoginPopup(false)}
          header="Confurim:"
          bodyText="Are you sure you want to log out of XPR?"
        >
          <IconButton onClick={handleOnLogoutClick}>
            <Send />
          </IconButton>
        </Popup>
      )}
    </StyledPageContainer>
  )
}
export const AdminPageWrapper = memo(AdminPageWrapperRaw)
