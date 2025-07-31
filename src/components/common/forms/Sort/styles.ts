import { getDarkSecondaryLightPrimary } from '@utils/themeUtils'
import styled from 'styled-components'

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
  color: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  white-space: nowrap;
`

export const SortSelectWrapper = styled.div`
  min-width: 250px;

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`
