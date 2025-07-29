import type { Game } from '@/types/game'
import GridCard from '@components/GridCard'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

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
    name: 'God of War',
    slug: 'god-of-war',
    background_image: 'https://placehold.co/600x400',
    rating: 4.6,
    rating_top: 5,
    metacritic: 94,
    playtime: 25,
    released: '2018-04-20',
    updated: '2023-12-14T10:00:00Z',
    platforms: [
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
      { id: 4, name: 'Action', slug: 'action' }
    ],
    publishers: [
      {
        id: 3,
        name: 'Sony Interactive Entertainment',
        slug: 'sony-interactive-entertainment'
      }
    ],
    developers: [
      { id: 3, name: 'Santa Monica Studio', slug: 'santa-monica-studio' }
    ],
    tags: [
      { id: 7, name: 'Mythology', slug: 'mythology' },
      { id: 8, name: 'Story Rich', slug: 'story-rich' }
    ],
    esrb_rating: { id: 4, name: 'Mature', slug: 'mature' },
    short_screenshots: []
  }
]

const meta: Meta<typeof GridCard> = {
  title: 'Components/GridCard',
  component: GridCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Grid responsivo que exibe cards de jogos com funcionalidade de favoritos'
      }
    }
  },
  argTypes: {
    games: {
      control: false,
      description: 'Array de jogos para exibir'
    },
    favorites: {
      control: false,
      description: 'Array de IDs dos jogos favoritos'
    },
    onFavoriteToggle: {
      action: 'favorite toggled',
      description: 'Função chamada quando um jogo é favoritado/desfavoritado'
    },
    emptyMessage: {
      control: 'text',
      description: 'Mensagem exibida quando não há jogos'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const GridCardWrapper = ({
  games,
  favorites: initialFavorites,
  emptyMessage
}: any) => {
  const [favorites, setFavorites] = useState<number[]>(initialFavorites || [])

  const handleFavoriteToggle = (gameId: number) => {
    setFavorites(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    )
  }

  return (
    <GridCard
      games={games}
      favorites={favorites}
      onFavoriteToggle={handleFavoriteToggle}
      emptyMessage={emptyMessage}
    />
  )
}

export const Default: Story = {
  render: args => <GridCardWrapper {...args} />,
  args: {
    games: mockGames,
    favorites: [1, 3],
    emptyMessage: 'Nenhum jogo encontrado.'
  }
}

export const Empty: Story = {
  render: args => <GridCardWrapper {...args} />,
  args: {
    games: [],
    favorites: [],
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
  render: args => <GridCardWrapper {...args} />,
  args: {
    games: mockGames,
    favorites: [1, 2, 3, 4],
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
  render: args => <GridCardWrapper {...args} />,
  args: {
    games: mockGames,
    favorites: [],
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
  render: args => <GridCardWrapper {...args} />,
  args: {
    games: [],
    favorites: [],
    emptyMessage:
      'Ops! Não encontramos jogos que correspondam aos seus critérios de busca.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Mensagem personalizada para estado vazio'
      }
    }
  }
}

export const SingleGame: Story = {
  render: args => <GridCardWrapper {...args} />,
  args: {
    games: [mockGames[0]],
    favorites: [1],
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

export const ManyGames: Story = {
  render: args => <GridCardWrapper {...args} />,
  args: {
    games: [...mockGames, ...mockGames, ...mockGames], // 12 jogos
    favorites: [1, 3, 5, 7, 9, 11],
    emptyMessage: 'Nenhum jogo encontrado.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid com muitos jogos para testar responsividade'
      }
    }
  }
}
