import {
  ElementType,
  LoadingMessage,
  LoadingSpinnerSize,
  LoadingSpinnerVariant,
  TextVariant
} from '@/types/common'
import Text from '@/components/common/ui/Text'
import * as S from './styles'

interface LoadingSpinnerProps {
  message?: string
  size?: LoadingSpinnerSize
  variant?: LoadingSpinnerVariant
}

const LoadingSpinner = ({
  message = LoadingMessage.DEFAULT,
  size = LoadingSpinnerSize.MEDIUM,
  variant = LoadingSpinnerVariant.DEFAULT
}: LoadingSpinnerProps) => {
  const renderSpinner = () => {
    switch (variant) {
      case LoadingSpinnerVariant.DOTS:
        return (
          <S.DotsSpinner $size={size}>
            <div />
          </S.DotsSpinner>
        )
      case LoadingSpinnerVariant.GRADIENT:
        return <S.GradientSpinner $size={size} />
      default:
        return <S.Spinner $size={size} />
    }
  }

  return (
    <S.LoadingContainer $size={size}>
      {renderSpinner()}
      {message && (
        <Text
          as={ElementType.P}
          $variant={TextVariant.TERTIARY}
          $lgFontSize={16}
        >
          {message}
        </Text>
      )}
    </S.LoadingContainer>
  )
}

export default LoadingSpinner
