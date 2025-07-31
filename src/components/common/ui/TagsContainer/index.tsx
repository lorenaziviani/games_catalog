import { ComponentSize, TagVariant } from '@/types/common'
import Tag from '@components/common/ui/Tag'
import * as S from './styles'

interface TagsContainerProps {
  items: Array<{ id: number; name: string }>
  variant: TagVariant
  maxItems?: number
  size?: ComponentSize
}

const TagsContainer = ({
  items,
  variant,
  maxItems = 3,
  size = ComponentSize.MEDIUM
}: TagsContainerProps) => {
  const displayItems = items.slice(0, maxItems)
  return (
    <S.Container>
      {displayItems.map(item => (
        <Tag key={item.id} variant={variant} size={size}>
          {item.name}
        </Tag>
      ))}
    </S.Container>
  )
}
export default TagsContainer
