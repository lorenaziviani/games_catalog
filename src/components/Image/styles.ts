import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  background-color: ${({ theme }) => theme.quaternary};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img<{ $isLoading: boolean; $hasError: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $isLoading, $hasError }) => ($isLoading || $hasError ? 0 : 1)};
  transition: opacity 0.3s ease;
  animation: ${fadeIn} 0.3s ease;
`

export const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.quaternary};
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  z-index: 1;
`

export const ErrorPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.tertiary};
  z-index: 1;
`

export const ErrorIcon = styled.div`
  width: 48px;
  height: 48px;
  border: 2px solid ${({ theme }) => theme.tertiary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  &::before {
    content: '!';
    font-weight: bold;
  }
`
