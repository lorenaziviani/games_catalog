import styled from 'styled-components'
import { getDarkSecondaryLightPrimary } from '../../../utils/themeUtils'

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.primary};

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
