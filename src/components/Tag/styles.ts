import { mobile, tablet } from '@/styles/breakpoint'
import { getSizeTokens, responsiveSizes } from '@/styles/size'
import { ComponentSize, TagVariant } from '@/types/common'
import { getThemeColor } from '@utils/themeUtils'
import styled from 'styled-components'

interface TagProps {
  $variant: TagVariant
  $size: ComponentSize
}

export const Tag = styled.span<TagProps>`
  background-color: ${({ $variant, theme }) => {
    switch ($variant) {
      case TagVariant.GENRE:
        return getThemeColor(theme, theme.quaternary, theme.secondary)
      case TagVariant.PLATFORM:
        return theme.tertiary
      default:
        return getThemeColor(theme, theme.primary, theme.tertiary)
    }
  }};
  color: ${({ $variant, theme }) => {
    switch ($variant) {
      case TagVariant.GENRE:
        return getThemeColor(theme, theme.primary, theme.white)
      case TagVariant.PLATFORM:
        return theme.white
      default:
        return getThemeColor(theme, theme.primary, theme.tertiary)
    }
  }};
  padding: ${({ $size }) => getSizeTokens($size).padding};
  font-size: ${({ $size }) => getSizeTokens($size).fontSize};
  border-radius: ${({ $size }) => getSizeTokens($size).borderRadius};
  display: inline-block;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  ${tablet} {
    padding: ${({ $size }) => responsiveSizes[$size].tablet.padding};
    font-size: ${({ $size }) => responsiveSizes[$size].tablet.fontSize};
    border-radius: ${({ $size }) => responsiveSizes[$size].tablet.borderRadius};
  }

  ${mobile} {
    padding: ${({ $size }) => responsiveSizes[$size].mobile.padding};
    font-size: ${({ $size }) => responsiveSizes[$size].mobile.fontSize};
    border-radius: ${({ $size }) => responsiveSizes[$size].mobile.borderRadius};
  }
`
