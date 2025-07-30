import styled from 'styled-components'
import {
  getDarkQuaternaryLightPrimary,
  getDarkSecondaryLightPrimary,
  getDarkSecondaryLightQuaternary,
  getDarkTertiaryLightQuaternary
} from '../../../utils/themeUtils'

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const SelectButton = styled.button<{
  $isOpen: boolean
  $isDarkMode: boolean
}>`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  color: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};

  &:hover {
    border-color: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  }

  ${({ $isOpen, theme }) =>
    $isOpen &&
    `
    border-color: ${getDarkSecondaryLightPrimary(theme)};
    box-shadow: 0 0 0 2px ${getDarkSecondaryLightPrimary(theme)}20;
  `}
`

export const SelectText = styled.span`
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`

export const Dropdown = styled.div<{ $isDarkMode: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
`

export const Option = styled.div<{
  $isSelected: boolean
  $isDarkMode: boolean
}>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background: ${({ $isSelected, theme }) =>
    $isSelected ? getDarkSecondaryLightQuaternary(theme) : theme.white};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.white : theme.tertiary};

  &:hover {
    background: ${({ theme }) => getDarkQuaternaryLightPrimary(theme)};
    color: ${({ theme }) => theme.white};
  }
`

export const Checkbox = styled.div<{ $isSelected: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid
    ${({ theme, $isSelected }) =>
      $isSelected
        ? getDarkSecondaryLightPrimary(theme)
        : getDarkTertiaryLightQuaternary(theme)};
  border-radius: 3px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isSelected, theme }) =>
    $isSelected ? getDarkSecondaryLightPrimary(theme) : 'transparent'};
  transition: all 0.2s ease;
  flex-shrink: 0;
`

export const Checkmark = styled.span`
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
`

export const OptionText = styled.span`
  flex: 1;
  font-size: 0.9rem;
`
