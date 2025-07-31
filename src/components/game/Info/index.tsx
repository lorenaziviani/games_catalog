import { ElementType, TextVariant } from '@/types/common'
import Text from '@components/common/ui/Text'
import { FaCalendar, FaGamepad } from 'react-icons/fa'
import * as S from './styles'

interface InfoProps {
  released: string
  playtime: number
  showPlaytime?: boolean
}

const Info = ({ released, playtime, showPlaytime = true }: InfoProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <S.Info>
      <S.InfoItem>
        <FaCalendar />
        <Text
          as={ElementType.SPAN}
          $variant={TextVariant.QUATERNARY}
          $lgFontSize={16}
        >
          {formatDate(released)}
        </Text>
      </S.InfoItem>
      {showPlaytime && (
        <S.InfoItem>
          <FaGamepad />
          <Text
            as={ElementType.SPAN}
            $variant={TextVariant.QUATERNARY}
            $lgFontSize={16}
          >
            {`${playtime}h`}
          </Text>
        </S.InfoItem>
      )}
    </S.Info>
  )
}

export default Info
