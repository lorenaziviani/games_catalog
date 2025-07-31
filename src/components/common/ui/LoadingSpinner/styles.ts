import { LoadingSpinnerSize } from '@/types/common'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const getSizeValue = (size: LoadingSpinnerSize) => {
  switch (size) {
    case LoadingSpinnerSize.SMALL:
      return '2rem'
    case LoadingSpinnerSize.LARGE:
      return '4rem'
    default:
      return '3rem'
  }
}

const getDotSize = (size: LoadingSpinnerSize) => {
  switch (size) {
    case LoadingSpinnerSize.SMALL:
      return '0.5rem'
    case LoadingSpinnerSize.LARGE:
      return '1rem'
    default:
      return '0.75rem'
  }
}

export const LoadingContainer = styled.div<{ $size: LoadingSpinnerSize }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${({ $size }) =>
    $size === LoadingSpinnerSize.LARGE ? '400px' : '200px'};
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`

export const Spinner = styled.div<{ $size: LoadingSpinnerSize }>`
  position: relative;
  width: ${({ $size }) => getSizeValue($size)};
  height: ${({ $size }) => getSizeValue($size)};
  margin-bottom: ${({ $size }) =>
    $size === LoadingSpinnerSize.LARGE ? '1.5rem' : '1rem'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top: 3px solid ${({ theme }) => theme.primary};
    border-right: 3px solid ${({ theme }) => theme.secondary};
    animation: ${spin} 1s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top: 2px solid ${({ theme }) => theme.tertiary};
    border-left: 2px solid ${({ theme }) => theme.quaternary};
    animation: ${spin} 0.8s linear infinite reverse;
    transform: translate(-50%, -50%);
  }
`

export const DotsSpinner = styled.div<{ $size: LoadingSpinnerSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: ${({ $size }) =>
    $size === LoadingSpinnerSize.LARGE ? '1.5rem' : '1rem'};

  &::before,
  &::after,
  & > div {
    content: '';
    width: ${({ $size }) => getDotSize($size)};
    height: ${({ $size }) => getDotSize($size)};
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    animation: ${bounce} 1.4s ease-in-out infinite both;
  }

  &::before {
    animation-delay: -0.32s;
  }

  & > div {
    animation-delay: -0.16s;
  }

  &::after {
    animation-delay: 0s;
  }
`

export const GradientSpinner = styled.div<{ $size: LoadingSpinnerSize }>`
  position: relative;
  width: ${({ $size }) => getSizeValue($size)};
  height: ${({ $size }) => getSizeValue($size)};
  margin-bottom: ${({ $size }) =>
    $size === LoadingSpinnerSize.LARGE ? '1.5rem' : '1rem'};
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    ${({ theme }) => theme.primary} 0deg,
    ${({ theme }) => theme.secondary} 120deg,
    ${({ theme }) => theme.tertiary} 240deg,
    ${({ theme }) => theme.primary} 360deg
  );
  animation: ${spin} 1.5s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    background: ${({ theme }) => theme.white};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`
