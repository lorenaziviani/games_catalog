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
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Provider } from 'react-redux'
import Text from '../Text'
import * as S from './styles'

const mockGame: Game = {
  id: 1,
  name: 'The Legend of Zelda: Breath of the Wild',
  slug: 'the-legend-of-zelda-breath-of-the-wild',
  background_image:
    'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9b5e8.jpg',
  rating: 4.5,
  rating_top: 5,
  metacritic: 97,
  playtime: 120,
  released: '2017-03-03',
  updated: '2023-01-01T00:00:00',
  tba: false,
  added: 1500,
  added_by_status: {
    yet: 50,
    owned: 1000,
    beaten: 300,
    toplay: 100,
    dropped: 30,
    playing: 20
  },
  ratings: [
    {
      id: 5,
      title: 'exceptional',
      count: 100,
      percent: 80.0
    },
    {
      id: 4,
      title: 'recommended',
      count: 20,
      percent: 16.0
    },
    {
      id: 3,
      title: 'meh',
      count: 5,
      percent: 4.0
    }
  ],
  ratings_count: 125,
  reviews_text_count: 10,
  suggestions_count: 50,
  user_game: null,
  reviews_count: 15,
  saturated_color: '0f0f0f',
  dominant_color: '0f0f0f',
  platforms: [
    {
      platform: {
        id: 4,
        name: 'PC',
        slug: 'pc',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 552949,
        image_background:
          'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg'
      },
      released_at: '2020-12-10',
      requirements_en: {
        minimum: 'Windows 10',
        recommended: 'Windows 10, 16GB RAM'
      },
      requirements_ru: null
    }
  ],
  genres: [
    {
      id: 1,
      name: 'Action',
      slug: 'action',
      games_count: 100,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    },
    {
      id: 2,
      name: 'Adventure',
      slug: 'adventure',
      games_count: 200,
      image_background:
        'https://media.rawg.io/media/games/b6b/b6b20bfc4b34e312dbc8aac53c95a348.jpg'
    }
  ],
  tags: [
    {
      id: 1,
      name: 'Open World',
      slug: 'open-world',
      language: 'eng',
      games_count: 150,
      image_background:
        'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg'
    },
    {
      id: 2,
      name: 'Exploration',
      slug: 'exploration',
      language: 'eng',
      games_count: 120,
      image_background:
        'https://media.rawg.io/media/games/b6b/b6b20bfc4b34e312dbc8aac53c95a348.jpg'
    }
  ],
  short_screenshots: [],
  stores: [
    {
      id: 1,
      store: {
        id: 1,
        name: 'Steam',
        slug: 'steam',
        domain: 'store.steampowered.com',
        games_count: 115878,
        image_background:
          'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg'
      }
    }
  ],
  clip: null
}

const ListStory = ({
  games,
  loading,
  error,
  currentPage: initialCurrentPage,
  totalPages
}: {
  games: Game[]
  loading: boolean
  error: string
  currentPage: number
  totalPages: number
  searchTerm: string
}) => {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage)

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
    games: [mockGame],
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 1,
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
    games: [mockGame],
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 1,
    searchTerm: ''
  }
}
