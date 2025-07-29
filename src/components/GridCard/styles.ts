import styled from 'styled-components'

export const GridCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

export const EmptyContainer = styled.div`
  text-align: center;
  padding: 3rem;
`
