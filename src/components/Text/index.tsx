import { ElementType, TextVariant } from '@/types/common'
import type { FontSizeType } from '@styles/fontSize'
import * as S from './styles'

type TextProps = {
  children: string
  as?: ElementType
  $variant?: TextVariant
} & FontSizeType

const Text = ({
  children,
  as = ElementType.P,
  $lgFontSize,
  $mdFontSize,
  $smFontSize,
  $variant = TextVariant.PRIMARY
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

export default Text
