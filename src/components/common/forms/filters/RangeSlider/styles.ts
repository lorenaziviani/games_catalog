import {
  getDarkSecondaryLightPrimary,
  getDarkTertiaryLightQuaternary
} from '@utils/themeUtils'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const Label = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => getDarkTertiaryLightQuaternary(theme)};
`

export const SliderContainer = styled.div`
  position: relative;
  padding: 1rem 0;
`

export const Track = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.quaternary};
  border-radius: 2px;
  position: relative;
`

export const Range = styled.div<{ $left: number; $right: number }>`
  position: absolute;
  height: 100%;
  background: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  border-radius: 2px;
  left: ${({ $left }) => $left}%;
  right: ${({ $right }) => $right}%;
`

export const Thumb = styled.div<{ $position: number }>`
  position: absolute;
  top: 50%;
  left: ${({ $position }) => $position}%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${({ theme }) => getDarkSecondaryLightPrimary(theme)};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.95);
  }
`

export const Values = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.tertiary};
`

export const Value = styled.span`
  font-weight: 500;
`
