import { isLightMode } from '@utils/themeUtils'
import { FaMoon } from 'react-icons/fa6'
import { RiSunFill } from 'react-icons/ri'
import { useTheme } from 'styled-components'
import * as S from './styles'

type ThemeButtonProps = {
  onClick: () => void
}

const ThemeButton = ({ onClick }: ThemeButtonProps) => {
  const theme = useTheme()

  return (
    <S.Container>
      <S.Button onClick={onClick}>
        {isLightMode(theme) ? <FaMoon /> : <RiSunFill />}
      </S.Button>
    </S.Container>
  )
}

export default ThemeButton
