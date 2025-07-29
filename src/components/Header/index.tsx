import { ElementType, TextVariant } from '@/types/common'
import { useState } from 'react'
import { BsJoystick } from 'react-icons/bs'
import { FaBars, FaHeart, FaHome, FaTimes } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { Text } from '../Text'
import * as S from './styles'

const Header = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Início', icon: FaHome },
    { path: '/favorites', label: 'Favoritos', icon: FaHeart }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <S.HeaderContainer>
      <S.HeaderMainContainer>
        <S.Logo>
          <BsJoystick />
        </S.Logo>

        <S.MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </S.MobileMenuButton>

        <S.Nav $isOpen={isMenuOpen}>
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <S.NavItem key={item.path + item.label} $isActive={isActive}>
                <Link to={item.path} onClick={closeMenu}>
                  <Icon />
                  <Text as={ElementType.P} $variant={TextVariant.SECONDARY}>
                    {item.label}
                  </Text>
                </Link>
              </S.NavItem>
            )
          })}
        </S.Nav>
      </S.HeaderMainContainer>
    </S.HeaderContainer>
  )
}

export default Header
