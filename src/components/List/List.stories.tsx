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
import { Text } from '../Text'
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
          slug: 'pc'
        },
        requirements: {}
      }
    ],
    genres: [
      { id: 5, name: 'RPG', slug: 'role-playing-games-rpg' },
      { id: 3, name: 'Adventure', slug: 'adventure' }
    ],
    publishers: [{ id: 1, name: 'CD Projekt', slug: 'cd-projekt' }],
    developers: [{ id: 1, name: 'CD Projekt Red', slug: 'cd-projekt-red' }],
    tags: [
      { id: 1, name: 'Open World', slug: 'open-world' },
      { id: 2, name: 'Story Rich', slug: 'story-rich' }
    ],
    esrb_rating: { id: 4, name: 'Mature', slug: 'mature' },
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
          slug: 'pc'
        },
        requirements: {}
      }
    ],
    genres: [
      { id: 3, name: 'Adventure', slug: 'adventure' },
      { id: 5, name: 'RPG', slug: 'role-playing-games-rpg' }
    ],
    publishers: [{ id: 2, name: 'Rockstar Games', slug: 'rockstar-games' }],
    developers: [{ id: 2, name: 'Rockstar Games', slug: 'rockstar-games' }],
    tags: [
      { id: 3, name: 'Western', slug: 'western' },
      { id: 4, name: 'Open World', slug: 'open-world' }
    ],
    esrb_rating: { id: 4, name: 'Mature', slug: 'mature' },
    short_screenshots: []
  }
]

const ListStory = ({
  games,
  loading,
  error,
  currentPage: initialCurrentPage,
  totalPages,
  searchTerm,
  favorites
}: {
  games: Game[]
  loading: boolean
  error: string
  currentPage: number
  totalPages: number
  searchTerm: string
  favorites: number[]
}) => {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)

  const handleSearch = (value: string) => console.log('Search:', value)
  const handleFavorite = (gameId: number) => console.log('Favorite:', gameId)
  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page)
    setCurrentPage(page)
  }

  if (loading && games.length === 0) {
    return (
      <LoadingSpinner
        message={LoadingMessage.GAMES}
        size={LoadingSpinnerSize.LARGE}
      />
    )
  }

  return (
    <S.Container>
      <SearchBar
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar jogos..."
      />

      {error && (
        <S.ErrorMessage>
          <Text
            as={ElementType.TITLE}
            $variant={TextVariant.SECONDARY}
            $lgFontSize={16}
          >
            {error}
          </Text>
        </S.ErrorMessage>
      )}

      <GridCard
        games={games}
        favorites={favorites}
        onFavoriteToggle={handleFavorite}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </S.Container>
  )
}

const meta: Meta<typeof ListStory> = {
  title: 'Components/List',
  component: ListStory,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Componente principal que integra busca, grid de jogos e paginação'
      }
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
    searchTerm: '',
    favorites: [1]
  },
  parameters: {
    docs: {
      description: {
        story: 'Lista padrão com jogos carregados e alguns favoritos'
      }
    }
  }
}

export const Loading: Story = {
  args: {
    games: [],
    loading: true,
    error: '',
    currentPage: 1,
    totalPages: 1,
    searchTerm: '',
    favorites: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado de carregamento inicial'
      }
    }
  }
}

export const Empty: Story = {
  args: {
    games: [],
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 0,
    searchTerm: '',
    favorites: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado vazio quando não há jogos'
      }
    }
  }
}

export const WithError: Story = {
  args: {
    games: [],
    loading: false,
    error: 'Erro ao carregar os jogos. Tente novamente.',
    currentPage: 1,
    totalPages: 1,
    searchTerm: '',
    favorites: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Exibindo mensagem de erro'
      }
    }
  }
}

export const WithSearch: Story = {
  args: {
    games: [mockGames[0]],
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 1,
    searchTerm: 'witcher',
    favorites: [1]
  },
  parameters: {
    docs: {
      description: {
        story: 'Resultado de busca com termo "witcher"'
      }
    }
  }
}

export const AllFavorited: Story = {
  args: {
    games: mockGames,
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 5,
    searchTerm: '',
    favorites: [1, 2]
  },
  parameters: {
    docs: {
      description: {
        story: 'Todos os jogos marcados como favoritos'
      }
    }
  }
}

export const NoFavorites: Story = {
  args: {
    games: mockGames,
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 5,
    searchTerm: '',
    favorites: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Nenhum jogo marcado como favorito'
      }
    }
  }
}

export const PaginationExample: Story = {
  args: {
    games: mockGames,
    loading: false,
    error: '',
    currentPage: 3,
    totalPages: 10,
    searchTerm: '',
    favorites: [1]
  },
  parameters: {
    docs: {
      description: {
        story:
          'Paginação interativa - clique nos números para navegar entre as páginas'
      }
    }
  }
}
