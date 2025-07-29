import type { FontSizeType } from '@styles/fontSize'
import * as S from './styles'

type TextProps = {
  children: string
  as?: 'p' | 'span' | 'h2' | 'h3'
  $variant?: 'primary' | 'secondary'
} & FontSizeType

export const Text = ({
  children,
  as = 'p',
  $lgFontSize,
  $mdFontSize,
  $smFontSize,
  $variant = 'primary'
}: TextProps) => {
  return (
    <S.TextContent
      as={as}
      $lgFontSize={$lgFontSize}
      $mdFontSize={$mdFontSize}
      $smFontSize={$smFontSize}
      $variant={$variant}
    >
      {children}
    </S.TextContent>
  )
}
