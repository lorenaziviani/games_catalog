import styled from 'styled-components'
import { mobile, tablet } from '../../styles/breakpoint'
import { fontSizeToRem, type FontSize } from '../../styles/fontSize'

type TextProps = {
  $lgFontSize?: FontSize
  $mdFontSize?: FontSize
  $smFontSize?: FontSize
  $variant?: 'primary' | 'secondary'
}

export const TextContent = styled.p<TextProps>`
  font-size: ${props => fontSizeToRem(props.$lgFontSize || 16)};
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.primary : theme.secondary};
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
