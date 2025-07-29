import styled from 'styled-components'

export const Info = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.tertiary};
  font-size: 0.9rem;
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`
