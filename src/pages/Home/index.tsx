import List from '@components/List'
import { MainContainer } from '@styles/global'
import styled from 'styled-components'

const HomeContainer = styled(MainContainer)`
  padding: 2rem 2%;
`

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.tertiary};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <Title>Catálogo de Jogos</Title>
        <Subtitle>
          Explore o universo dos jogos e descubra seus favoritos. Navegue por
          milhares de títulos, veja detalhes, avaliações e salve seus favoritos.
        </Subtitle>
      </HeroSection>

      <List />
    </HomeContainer>
  )
}

export default HomePage
