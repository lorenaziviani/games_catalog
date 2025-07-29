import { getSizeTokens } from '@/styles/size'
import { RatingBadgeSize } from '@/types/common'
import styled from 'styled-components'

interface RatingBadgeProps {
  $color: string
  $size: RatingBadgeSize
}

export const RatingBadge = styled.div<RatingBadgeProps>`
  background-color: ${({ $color }) => $color};
  color: white;
  padding: ${({ $size }) => getSizeTokens($size).padding};
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: ${({ $size }) => getSizeTokens($size).gap};
  font-size: ${({ $size }) => getSizeTokens($size).fontSize};
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 10px;
  left: 10px;
  min-width: ${({ $size }) => getSizeTokens($size).minWidth};
  min-height: ${({ $size }) => getSizeTokens($size).minHeight};
`
