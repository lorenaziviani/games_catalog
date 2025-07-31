import {
  ElementType,
  MetacriticLabel,
  MetacriticScoreSize,
  TextVariant
} from '@/types/common'
import Text from '@components/common/ui/Text'
import * as S from './styles'

interface MetacriticScoreProps {
  score: number
  showLabel?: boolean
  size?: MetacriticScoreSize
}

const MetacriticScore = ({
  score,
  showLabel = true,
  size = MetacriticScoreSize.MEDIUM
}: MetacriticScoreProps) => {
  return (
    <S.MetacriticScore $score={score} $size={size}>
      {showLabel && (
        <Text
          as={ElementType.SPAN}
          $variant={TextVariant.WHITE}
          $lgFontSize={16}
        >
          {MetacriticLabel.DEFAULT}
        </Text>
      )}
      <Text as={ElementType.SPAN} $variant={TextVariant.WHITE} $lgFontSize={16}>
        {`${score}`}
      </Text>
    </S.MetacriticScore>
  )
}

export default MetacriticScore
