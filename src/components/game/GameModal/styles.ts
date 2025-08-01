import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 8px;
  }
`

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  overflow-y: auto;
  position: relative;
  animation: ${slideIn} 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  @media (min-width: 1024px) {
    max-width: 80vw;
    max-height: 85vh;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.quaternary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.tertiary};
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${({ theme }) => theme.tertiary};
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.quinary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }
`

export const CloseIcon = styled.span`
  font-size: 24px;
  font-weight: bold;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`
