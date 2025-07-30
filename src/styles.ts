import { styled } from 'styled-components'
import { mobile } from './styles/breakpoint'
import { MainContainer } from './styles/global'

export const ThemeButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0.5rem;
  z-index: 10;

  ${mobile} {
    top: 0.5rem;
    right: 1rem;
  }
`

export const AppContainer = styled(MainContainer)`
  padding: 0;
  margin-top: 4rem;
  position: relative;
  min-height: calc(100vh - 80px);
`
