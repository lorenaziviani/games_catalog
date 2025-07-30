import { store } from '@/store'
import type { Game } from '@/types/game'
import GridCard from '@components/GridCard'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Provider } from 'react-redux'

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
      },
      {
        platform: {
          id: 187,
          name: 'PlayStation 4',
          slug: 'playstation4'
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
      },
      {
        platform: {
          id: 187,
          name: 'PlayStation 4',
          slug: 'playstation4'
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
  },
  {
    id: 3,
    name: 'Cyberpunk 2077',
    slug: 'cyberpunk-2077',
    background_image: 'https://placehold.co/600x400',
    rating: 4.2,
    rating_top: 5,
    metacritic: 75,
    playtime: 60,
    released: '2020-12-10',
    updated: '2023-12-14T10:00:00Z',
    platforms: [
      {
        platform: {
          id: 4,
          name: 'PC',
          slug: 'pc'
        },
        requirements: {}
      },
      {
        platform: {
          id: 187,
          name: 'PlayStation 4',
          slug: 'playstation4'
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
      { id: 5, name: 'Cyberpunk', slug: 'cyberpunk' },
      { id: 6, name: 'Open World', slug: 'open-world' }
    ],
    esrb_rating: { id: 4, name: 'Mature', slug: 'mature' },
    short_screenshots: []
  },
  {
    id: 4,
    name: 'Elden Ring',
    slug: 'elden-ring',
    background_image: 'https://placehold.co/600x400',
    rating: 4.9,
    rating_top: 5,
    metacritic: 96,
    playtime: 150,
    released: '2022-02-25',
    updated: '2023-12-14T10:00:00Z',
    platforms: [
      {
        platform: {
          id: 4,
          name: 'PC',
          slug: 'pc'
        },
        requirements: {}
      },
      {
        platform: {
          id: 187,
          name: 'PlayStation 4',
          slug: 'playstation4'
        },
        requirements: {}
      }
    ],
    genres: [
      { id: 5, name: 'RPG', slug: 'role-playing-games-rpg' },
      { id: 3, name: 'Adventure', slug: 'adventure' }
    ],
    publishers: [{ id: 3, name: 'Bandai Namco', slug: 'bandai-namco' }],
    developers: [{ id: 3, name: 'FromSoftware', slug: 'fromsoftware' }],
    tags: [
      { id: 7, name: 'Souls-like', slug: 'souls-like' },
      { id: 8, name: 'Open World', slug: 'open-world' }
    ],
    esrb_rating: { id: 4, name: 'Mature', slug: 'mature' },
    short_screenshots: []
  }
]

// Interface para o wrapper
interface GridCardWrapperProps {
  games: Game[]
  initialFavorites: Game[]
  emptyMessage?: string
}

const meta: Meta<GridCardWrapperProps> = {
  title: 'Components/GridCard',
  component: GridCard,
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
          'Grid responsivo que exibe cards de jogos com funcionalidade de favoritos integrada ao Redux'
      }
    }
  },
  argTypes: {
    games: {
      control: false,
      description: 'Array de jogos para exibir'
    },
    initialFavorites: {
      control: false,
      description: 'Array de jogos para pré-carregar como favoritos'
    },
    emptyMessage: {
      control: 'text',
      description: 'Mensagem exibida quando não há jogos'
    }
  }
}

export default meta
type Story = StoryObj<GridCardWrapperProps>

// Wrapper para pré-carregar favoritos no Redux store
const GridCardWithFavorites = ({
  games,
  initialFavorites,
  emptyMessage
}: GridCardWrapperProps) => {
  // Pré-carregar favoritos no store para demonstração
  React.useEffect(() => {
    if (initialFavorites.length > 0) {
      // Simular favoritos pré-carregados
      initialFavorites.forEach(game => {
        store.dispatch({
          type: 'favorites/addToFavorites',
          payload: game
        })
      })
    }
  }, [initialFavorites])

  return <GridCard games={games} emptyMessage={emptyMessage} />
}

export const Default: Story = {
  render: args => <GridCardWithFavorites {...args} />,
  args: {
    games: mockGames,
    initialFavorites: [mockGames[0], mockGames[2]], // The Witcher 3 e Cyberpunk 2077
    emptyMessage: 'Nenhum jogo encontrado.'
  }
}

export const Empty: Story = {
  render: args => <GridCardWithFavorites {...args} />,
  args: {
    games: [],
    initialFavorites: [],
    emptyMessage: 'Nenhum jogo encontrado.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado vazio quando não há jogos para exibir'
      }
    }
  }
}

export const AllFavorited: Story = {
  render: args => <GridCardWithFavorites {...args} />,
  args: {
    games: mockGames,
    initialFavorites: mockGames, // Todos os jogos favoritos
    emptyMessage: 'Nenhum jogo encontrado.'
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
  render: args => <GridCardWithFavorites {...args} />,
  args: {
    games: mockGames,
    initialFavorites: [], // Nenhum jogo favorito
    emptyMessage: 'Nenhum jogo encontrado.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Nenhum jogo marcado como favorito'
      }
    }
  }
}

export const CustomEmptyMessage: Story = {
  render: args => <GridCardWithFavorites {...args} />,
  args: {
    games: [],
    initialFavorites: [],
    emptyMessage:
      'Ops! Não encontramos jogos para exibir. Tente ajustar os filtros.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Mensagem personalizada quando não há jogos'
      }
    }
  }
}

export const SingleGame: Story = {
  render: args => <GridCardWithFavorites {...args} />,
  args: {
    games: [mockGames[0]], // Apenas The Witcher 3
    initialFavorites: [mockGames[0]], // The Witcher 3 favorito
    emptyMessage: 'Nenhum jogo encontrado.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Exibindo apenas um jogo'
      }
    }
  }
}

export const MixedFavorites: Story = {
  render: args => <GridCardWithFavorites {...args} />,
  args: {
    games: mockGames,
    initialFavorites: [mockGames[1], mockGames[3]], // Red Dead 2 e Elden Ring
    emptyMessage: 'Nenhum jogo encontrado.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Alguns jogos marcados como favoritos'
      }
    }
  }
}
