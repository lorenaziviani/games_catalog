import styled from 'styled-components'

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.tertiary};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

export const StatItem = styled.div`
  text-align: center;
  flex: 1;
  min-width: 120px;

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
  }

  .stat-label {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.tertiary};
    margin-top: 0.5rem;
  }
`

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${({ theme }) => theme.secondary};
    opacity: 0.8;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`
