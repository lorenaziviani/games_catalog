import { ElementType, RatingBadgeSize, TextVariant } from '@/types/common'
import { FaStar } from 'react-icons/fa'
import { useTheme } from 'styled-components'
import { Text } from '../Text'
import * as S from './styles'

interface RatingBadgeProps {
  rating: number
  showIcon?: boolean
  size?: RatingBadgeSize
}

const RatingBadge = ({
  rating,
  showIcon = true,
  size = RatingBadgeSize.MEDIUM
}: RatingBadgeProps) => {
  const theme = useTheme()

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return theme.rating.excellent
    if (rating >= 4.0) return theme.rating.good
    if (rating >= 3.5) return theme.rating.average
    if (rating >= 3.0) return theme.rating.poor
    return theme.rating.bad
  }

  return (
    <S.RatingBadge $color={getRatingColor(rating)} $size={size}>
      {showIcon && <FaStar />}
      <Text as={ElementType.SPAN} $variant={TextVariant.WHITE} $lgFontSize={16}>
        {rating.toFixed(1)}
      </Text>
    </S.RatingBadge>
  )
}

export default RatingBadge
