import { MetacriticScoreSize } from '@/types/common'
import styled from 'styled-components'

interface MetacriticScoreProps {
  $score: number
  $size: MetacriticScoreSize
}

const getSizeStyles = (size: MetacriticScoreSize) => {
  switch (size) {
    case MetacriticScoreSize.SMALL:
      return {
        padding: '0.25rem 0.5rem',
        fontSize: '0.7rem',
        borderRadius: '3px'
      }
    case MetacriticScoreSize.LARGE:
      return {
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        borderRadius: '6px'
      }
    default: // medium
      return {
        padding: '0.5rem',
        fontSize: '0.8rem',
        borderRadius: '4px'
      }
  }
}

export const MetacriticScore = styled.div<MetacriticScoreProps>`
  background-color: ${({ $score, theme }) => {
    if ($score >= 90) return theme.rating.excellent
    if ($score >= 80) return theme.rating.good
    if ($score >= 70) return theme.rating.average
    if ($score >= 60) return theme.rating.poor
    return theme.rating.bad
  }};
  color: white;
  padding: ${({ $size }) => getSizeStyles($size).padding};
  border-radius: ${({ $size }) => getSizeStyles($size).borderRadius};
  text-align: center;
  font-size: ${({ $size }) => getSizeStyles($size).fontSize};
  font-weight: bold;
`
