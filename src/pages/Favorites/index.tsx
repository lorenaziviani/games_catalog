import { MainContainer } from '@styles/global'
import styled from 'styled-components'

const FavoritesContainer = styled(MainContainer)`
  padding: 2rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`

const Message = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.tertiary};
`

const FavoritesPage = () => {
  return (
    <FavoritesContainer>
      <Title>Meus Favoritos</Title>
      <Message>
        Página em desenvolvimento. Em breve você poderá ver seus heróis
        favoritos aqui!
      </Message>
    </FavoritesContainer>
  )
}

export default FavoritesPage
