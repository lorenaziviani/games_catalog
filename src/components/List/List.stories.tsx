import { store } from '@/store'
import {
  ElementType,
  LoadingMessage,
  LoadingSpinnerSize,
  TextVariant
} from '@/types/common'
import type { Game } from '@/types/game'
import GridCard from '@components/GridCard'
import LoadingSpinner from '@components/LoadingSpinner'
import Pagination from '@components/Pagination'
import SearchBar from '@components/SearchBar'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Provider } from 'react-redux'
import Text from '../Text'
import * as S from './styles'

const mockGames: Game[] = [
  {
    id: 1,
    name: 'The Witcher 3: Wild Hunt',
    slug: 'the-witcher-3-wild-hunt',
    background_image: 'https://placehold.co/600x400',
    rating: 4.8,
    rating_top: 5,
    metacritic: 93,
    playtime: 120,
    released: '2015-05-19',
    updated: '2023-12-14T10:00:00Z',
    platforms: [
      {
        platform: {
          id: 4,
          name: 'PC',
          slug: 'pc',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      }
    ],
    genres: [
      {
        id: 5,
        name: 'RPG',
        slug: 'role-playing-games-rpg',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 3,
        name: 'Adventure',
        slug: 'adventure',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    publishers: [
      {
        id: 1,
        name: 'CD Projekt',
        slug: 'cd-projekt',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    developers: [
      {
        id: 1,
        name: 'CD Projekt Red',
        slug: 'cd-projekt-red',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    tags: [
      {
        id: 1,
        name: 'Open World',
        slug: 'open-world',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 2,
        name: 'Story Rich',
        slug: 'story-rich',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    esrb_rating: {
      id: 4,
      name: 'Mature',
      slug: 'mature',
      games_count: 100,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    },
    short_screenshots: []
  },
  {
    id: 2,
    name: 'Red Dead Redemption 2',
    slug: 'red-dead-redemption-2',
    background_image: 'https://placehold.co/600x400',
    rating: 4.7,
    rating_top: 5,
    metacritic: 96,
    playtime: 80,
    released: '2018-10-26',
    updated: '2023-12-14T10:00:00Z',
    platforms: [
      {
        platform: {
          id: 4,
          name: 'PC',
          slug: 'pc',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 1000,
          image_background:
            'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
        },
        requirements: {}
      }
    ],
    genres: [
      {
        id: 3,
        name: 'Adventure',
        slug: 'adventure',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 5,
        name: 'RPG',
        slug: 'role-playing-games-rpg',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    publishers: [
      {
        id: 2,
        name: 'Rockstar Games',
        slug: 'rockstar-games',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    developers: [
      {
        id: 2,
        name: 'Rockstar Games',
        slug: 'rockstar-games',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    tags: [
      {
        id: 3,
        name: 'Western',
        slug: 'western',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      },
      {
        id: 4,
        name: 'Open World',
        slug: 'open-world',
        games_count: 100,
        image_background:
          'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
      }
    ],
    esrb_rating: {
      id: 4,
      name: 'Mature',
      slug: 'mature',
      games_count: 100,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    },
    short_screenshots: []
  }
]

const ListStory = ({
  games,
  loading,
  error,
  currentPage: initialCurrentPage,
  totalPages,
  searchTerm
}: {
  games: Game[]
  loading: boolean
  error: string
  currentPage: number
  totalPages: number
  searchTerm: string
}) => {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)

  const handleSearch = (value: string) => console.log('Search:', value)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    console.log('Page changed:', page)
  }

  if (loading) {
    return (
      <S.Container>
        <LoadingSpinner size={LoadingSpinnerSize.LARGE} />
        <Text as={ElementType.P} $variant={TextVariant.TERTIARY}>
          {LoadingMessage.GAMES}
        </Text>
      </S.Container>
    )
  }

  if (error) {
    return (
      <S.Container>
        <Text as={ElementType.P} $variant={TextVariant.PRIMARY}>
          {error}
        </Text>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <SearchBar
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar jogos..."
      />

      <GridCard games={games} emptyMessage="Nenhum jogo encontrado." />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </S.Container>
  )
}

const meta: Meta<typeof ListStory> = {
  title: 'Components/List',
  component: ListStory,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de lista que exibe jogos com busca, paginação e funcionalidade de favoritos integrada ao Redux'
      }
    }
  },
  argTypes: {
    games: {
      control: false,
      description: 'Array de jogos para exibir'
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento'
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro'
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Página atual'
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total de páginas'
    },
    searchTerm: {
      control: 'text',
      description: 'Termo de busca'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    games: mockGames,
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 5,
    searchTerm: ''
  }
}

export const Loading: Story = {
  args: {
    games: [],
    loading: true,
    error: '',
    currentPage: 1,
    totalPages: 1,
    searchTerm: ''
  }
}

export const Error: Story = {
  args: {
    games: [],
    loading: false,
    error: 'Erro ao carregar os jogos. Tente novamente.',
    currentPage: 1,
    totalPages: 1,
    searchTerm: ''
  }
}

export const Empty: Story = {
  args: {
    games: [],
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 1,
    searchTerm: ''
  }
}

export const WithPagination: Story = {
  args: {
    games: mockGames,
    loading: false,
    error: '',
    currentPage: 3,
    totalPages: 10,
    searchTerm: ''
  }
}

export const WithSearch: Story = {
  args: {
    games: mockGames,
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 1,
    searchTerm: 'The Witcher'
  }
}
