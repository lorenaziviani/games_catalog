import styled from 'styled-components'

export const SearchContainer = styled.div<{ $maxWidth: string }>`
  position: relative;
  margin-bottom: 2rem;
  max-width: ${({ $maxWidth }) => $maxWidth};
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid ${({ theme }) => theme.tertiary};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.tertiary};
  }
`

export const SearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.tertiary};
  font-size: 1.2rem;
`
