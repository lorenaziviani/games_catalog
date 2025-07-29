import { mobile, tablet } from '@styles/breakpoint'
import { MainContainer } from '@styles/global'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.tertiary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

export const HeaderMainContainer = styled(MainContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2%;
  min-height: 70px;
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.secondary};
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  img {
    width: 100px;
    height: 100px;
  }
`

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.quaternary};
    color: ${({ theme }) => theme.primary};
  }

  ${mobile} {
    display: block;
  }
`

export const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${mobile} {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.primary};
    border-bottom: 2px solid ${({ theme }) => theme.tertiary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    gap: 0;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition: all 0.3s ease;
    z-index: 99;
  }

  ${tablet} {
    gap: 0.5rem;
  }
`

export const NavItem = styled.div<{ $isActive: boolean }>`
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    color: ${({ theme, $isActive }) =>
      $isActive ? theme.secondary : theme.quaternary};
    opacity: ${({ $isActive }) => ($isActive ? '100%' : '70%')};
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};

    &:hover {
      background-color: ${({ theme }) => theme.quaternary};
      opacity: '100%';
      color: ${({ theme }) => theme.primary};
      font-weight: 800;
    }

    svg {
      font-size: 1.1rem;
    }

    span {
      ${mobile} {
        display: block;
      }
    }
  }

  ${mobile} {
    width: 100%;

    a {
      width: 100%;
      justify-content: flex-start;
      padding: 1rem 2rem;
      border-radius: 0;
      border-bottom: 1px solid ${({ theme }) => theme.tertiary};
    }
  }
`
