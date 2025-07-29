import { Position } from '@/types/common'
import { mobile, tablet } from '@styles/breakpoint'
import {
  getSizeTokens,
  responsiveSizes,
  type ComponentSize
} from '@styles/size'
import styled from 'styled-components'

interface FavoriteButtonProps {
  $isFavorite: boolean
  $size: ComponentSize
  $position: Position
}

const getPositionStyles = (position: Position) => {
  switch (position) {
    case Position.TOP_LEFT:
      return { top: '10px', left: '10px' }
    case Position.BOTTOM_RIGHT:
      return { bottom: '10px', right: '10px' }
    case Position.BOTTOM_LEFT:
      return { bottom: '10px', left: '10px' }
    default:
      return { top: '10px', right: '10px' }
  }
}

export const FavoriteButton = styled.button<FavoriteButtonProps>`
  position: absolute;
  ${({ $position }) => getPositionStyles($position)};
  background-color: ${({ $isFavorite, theme }) =>
    $isFavorite ? theme.rating.bad : 'rgba(0, 0, 0, 0.5)'};
  color: white;
  border: none;
  border-radius: 50%;
  width: ${({ $size }) => getSizeTokens($size).width};
  height: ${({ $size }) => getSizeTokens($size).height};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${({ $size }) => getSizeTokens($size).fontSize};

  &:hover {
    background-color: ${({ $isFavorite, theme }) =>
      $isFavorite ? theme.rating.bad : 'rgba(0, 0, 0, 0.7)'};
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.quaternary};
  }

  ${tablet} {
    width: ${({ $size }) => responsiveSizes[$size].tablet.width};
    height: ${({ $size }) => responsiveSizes[$size].tablet.height};
    font-size: ${({ $size }) => responsiveSizes[$size].tablet.fontSize};
  }

  ${mobile} {
    width: ${({ $size }) => responsiveSizes[$size].mobile.width};
    height: ${({ $size }) => responsiveSizes[$size].mobile.height};
    font-size: ${({ $size }) => responsiveSizes[$size].mobile.fontSize};
  }
`
