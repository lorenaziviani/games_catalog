import { FaMoon } from 'react-icons/fa6'
import { RiSunFill } from 'react-icons/ri'
import { useTheme } from 'styled-components'
import { Button } from './styles'

type ThemeButtonProps = {
  onClick: () => void
}

const ThemeButton = ({ onClick }: ThemeButtonProps) => {
  const theme = useTheme()

  return (
    <>
      <Button onClick={onClick}>
        {theme.secondary === '#fefefe' ? <RiSunFill /> : <FaMoon />}
      </Button>
    </>
  )
}

export default ThemeButton
