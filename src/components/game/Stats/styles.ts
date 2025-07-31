import styled from 'styled-components'

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.tertiary};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 0.5rem 0;
`

export const ActionButton = styled.button`
  display: inline-block;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 1.5rem;
  font-weight: 600;
  display: inline-grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  cursor: pointer;
  border: none;

  &:hover {
    background: ${({ theme }) => theme.quinary};
    color: ${({ theme }) => theme.white};
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`
