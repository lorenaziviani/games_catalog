import { MainContainer } from '@styles/global'
import styled from 'styled-components'

export const Container = styled(MainContainer)`
  position: relative;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.secondary};
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};
  }
`
