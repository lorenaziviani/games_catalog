import styled from 'styled-components'
import { isDarkMode } from '../../utils/themeUtils'

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`

export const SortLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) =>
    isDarkMode(theme) ? theme.secondary : theme.primary};
  white-space: nowrap;
`

export const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid
    ${({ theme }) => (isDarkMode(theme) ? theme.secondary : theme.primary)};
  border-radius: 8px;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) =>
    isDarkMode(theme) ? theme.secondary : theme.primary};
  font-size: 1rem;
  cursor: pointer;
  min-width: 250px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) =>
      isDarkMode(theme) ? theme.secondary : theme.primary};
    box-shadow: 0 0 0 2px
      ${({ theme }) => (isDarkMode(theme) ? theme.secondary : theme.primary)}20;
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }

  option {
    padding: 0.5rem;
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) =>
      isDarkMode(theme) ? theme.secondary : theme.primary};
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`
