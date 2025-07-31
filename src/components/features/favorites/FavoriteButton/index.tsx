import { ComponentSize, Position } from '@/types/common'
import { FaHeart } from 'react-icons/fa'
import * as S from './styles'

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void
  size?: ComponentSize
  position?: Position
}

const FavoriteButton = ({
  isFavorite,
  onToggle,
  size = ComponentSize.MEDIUM,
  position = Position.TOP_RIGHT
}: FavoriteButtonProps) => {
  return (
    <S.FavoriteButton
      onClick={e => onToggle(e)}
      $isFavorite={isFavorite}
      $size={size}
      $position={position}
      data-testid="favorite-button"
      aria-label={
        isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      }
    >
      <FaHeart />
    </S.FavoriteButton>
  )
}

export default FavoriteButton
