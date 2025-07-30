import styled from 'styled-components'
import {
  getDarkPrimaryLightSecondary,
  getDarkSecondaryLightPrimary
} from '../../utils/themeUtils'

export const FiltersContainer = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.quaternary};
`

export const FiltersTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ActiveFiltersBadge = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`

export const FiltersActions = styled.div`
  display: flex;
  gap: 1rem;
`

export const ExpandButton = styled.button`
  background: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => getDarkPrimaryLightSecondary(theme)};
    border: 1px solid ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
    color: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const FiltersContent = styled.div`
  padding: 1rem;
`

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

export const ResetButton = styled.button`
  background: ${({ theme }) => theme.quaternary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.quinary};
  }
`
export const FilterSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const FilterSectionTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`

export const FilterSectionContent = styled.div`
  width: 100%;
`
