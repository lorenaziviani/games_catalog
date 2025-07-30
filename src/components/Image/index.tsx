import { ElementType, TextVariant } from '@/types/common'
import { useState } from 'react'
import Text from '../Text'
import * as S from './styles'

interface ImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
}

const Image = ({
  src,
  alt,
  fallbackSrc = '/placeholder-game.jpg',
  className
}: ImageProps) => {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleImageLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  return (
    <S.ImageContainer className={className}>
      {isLoading && <S.LoadingSpinner />}
      <S.Image
        src={imageSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        $isLoading={isLoading}
        $hasError={hasError}
      />
      {hasError && imageSrc === fallbackSrc && (
        <S.ErrorPlaceholder>
          <S.ErrorIcon />
          <Text as={ElementType.TITLE} $variant={TextVariant.SECONDARY}>
            Imagem não disponível
          </Text>
        </S.ErrorPlaceholder>
      )}
    </S.ImageContainer>
  )
}

export default Image
