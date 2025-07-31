import { getDarkTertiaryLightQuaternary } from '@/utils/themeUtils'
import styled from 'styled-components'

export const Button = styled.button`
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.secondary};
    outline-offset: 2px;
  }
`

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.secondary};
  border: 1px solid ${({ theme }) => theme.quaternary};
  border-radius: 8px;
  padding: 16px;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 8px;
`

export const MenuItem = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: ${({ active, theme }) =>
    active ? getDarkTertiaryLightQuaternary(theme) : 'transparent'};
  color: ${({ active, theme }) => (active ? 'white' : theme.primary)};
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  margin-bottom: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}20;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.secondary};
    outline-offset: 2px;
  }
`

export const MenuTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`

export const ColorblindPreview = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
`

export const ColorDot = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ color }) => color};
  border: 1px solid ${({ theme }) => theme.quaternary};
`
