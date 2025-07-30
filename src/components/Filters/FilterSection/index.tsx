import type { ReactNode } from 'react'
import { useTheme } from 'styled-components'
import { ElementType, TextVariant } from '../../../types/common'
import { isDarkMode } from '../../../utils/themeUtils'
import Text from '../../Text'
import * as S from './styles'

interface FilterSectionProps {
  title: string
  children: ReactNode
}

const FilterSection = ({ title, children }: FilterSectionProps) => {
  const theme = useTheme()

  return (
    <S.Container>
      <Text
        as={ElementType.P}
        $variant={
          isDarkMode(theme) ? TextVariant.SECONDARY : TextVariant.PRIMARY
        }
        $lgFontSize={16}
      >
        {title}
      </Text>
      <S.Content>{children}</S.Content>
    </S.Container>
  )
}

export default FilterSection
