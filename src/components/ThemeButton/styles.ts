import styled from 'styled-components'

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
  position: fixed;
  z-index: 1000;
  top: 1.5%;
  right: 1.5%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.primary};
    border: 2px solid ${({ theme }) => theme.primary};
  }
`
