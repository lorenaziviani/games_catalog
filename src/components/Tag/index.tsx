import { ComponentSize, TagVariant } from '@/types/common'
import * as S from './styles'

interface TagProps {
  children: React.ReactNode
  variant?: TagVariant
  size?: ComponentSize
}

const Tag = ({
  children,
  variant = TagVariant.GENRE,
  size = ComponentSize.MEDIUM
}: TagProps) => {
  return (
    <S.Tag $variant={variant} $size={size}>
      {children}
    </S.Tag>
  )
}

export default Tag
