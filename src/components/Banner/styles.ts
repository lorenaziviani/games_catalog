import { mobile } from '@styles/breakpoint'
import styled, { keyframes } from 'styled-components'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

export const BannerSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 4rem 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}15 0%,
    ${({ theme }) => theme.quaternary}15 50%,
    ${({ theme }) => theme.primary}15 100%
  );
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      ${({ theme }) => theme.primary}10 50%,
      transparent 70%
    );
    animation: ${pulse} 3s ease-in-out infinite;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto 4rem auto;

  ${mobile} {
    text-align: left;
    padding: 3rem 1.5rem;
    margin-bottom: 3rem;
  }
`

export const BannerContent = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  z-index: 1;
`

export const Badge = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px ${({ theme }) => theme.primary}30;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;
  display: inline-grid;
  grid-auto-flow: column;
  gap: 0.5rem;
`
