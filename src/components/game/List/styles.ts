import { MainContainer } from '@styles/global'
import styled from 'styled-components'

export const Container = styled(MainContainer)`
  padding: 2rem 2%;
`

export const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.quaternary};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`
