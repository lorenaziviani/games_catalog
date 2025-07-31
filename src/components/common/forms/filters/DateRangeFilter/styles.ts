import { getDarkSecondaryLightPrimary } from '@utils/themeUtils'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

export const DateInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};

  &::placeholder {
    color: ${({ theme }) => theme.tertiary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
    box-shadow: 0 0 0 2px
      ${({ theme }) => getDarkSecondaryLightPrimary(theme)}20;
  }

  &:hover {
    border-color: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  }
`

export const Separator = styled.span`
  color: ${({ theme }) => theme.tertiary};
  font-weight: 500;
`
