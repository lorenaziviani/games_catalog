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
`
