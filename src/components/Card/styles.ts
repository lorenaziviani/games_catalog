import styled from 'styled-components'

export const Card = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`

export const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`

export const CardContent = styled.div`
  padding: 1.5rem;
`
