import { TextVariant } from '@/types/common'
import { mobile, tablet } from '@styles/breakpoint'
import { fontSizeToRem, type FontSize } from '@styles/fontSize'
import styled from 'styled-components'
import { getTextColorByVariant } from '../../utils/themeUtils'

type TextProps = {
  $lgFontSize?: FontSize
  $mdFontSize?: FontSize
  $smFontSize?: FontSize
  $variant?: TextVariant
}

export const TextContent = styled.p<TextProps>`
  font-size: ${props => fontSizeToRem(props.$lgFontSize || 16)};
  color: ${({ $variant, theme }) =>
    $variant ? getTextColorByVariant($variant, theme) : theme.primary};
  ${tablet} {
    font-size: ${props =>
      fontSizeToRem(props.$mdFontSize || props.$lgFontSize || 16)};
  }
  ${mobile} {
    font-size: ${props =>
      fontSizeToRem(
        props.$smFontSize || props.$mdFontSize || props.$lgFontSize || 16
      )};
  }
`
