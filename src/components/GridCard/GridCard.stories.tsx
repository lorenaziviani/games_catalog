import { store } from '@/store'
import type { Game } from '@/types/game'
import GridCard from '@components/GridCard'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Provider } from 'react-redux'

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
    games: [mockGame], // Apenas The Witcher 3
    initialFavorites: [mockGame], // The Witcher 3 favorito
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
    games: [mockGame],
    initialFavorites: [mockGame], // Todos os jogos favoritos
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
    games: [mockGame],
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
    games: [mockGame], // Apenas The Witcher 3
    initialFavorites: [mockGame], // The Witcher 3 favorito
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
    games: [mockGame],
    initialFavorites: [mockGame], // Red Dead 2 e Elden Ring
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
