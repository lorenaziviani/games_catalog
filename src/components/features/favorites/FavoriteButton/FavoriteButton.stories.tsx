import { ComponentSize, Position } from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import FavoriteButton from './index'

const meta: Meta<typeof FavoriteButton> = {
  title: 'Features/Favorites/FavoriteButton',
  component: FavoriteButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Botão de favorito com diferentes tamanhos e posições'
      }
    }
  },
  argTypes: {
    isFavorite: {
      control: { type: 'boolean' },
      description: 'Estado de favorito'
    },
    size: {
      control: { type: 'select' },
      options: [ComponentSize.SMALL, ComponentSize.MEDIUM, ComponentSize.LARGE],
      description: 'Tamanho do botão'
    },
    position: {
      control: { type: 'select' },
      options: [
        Position.TOP_RIGHT,
        Position.TOP_LEFT,
        Position.BOTTOM_RIGHT,
        Position.BOTTOM_LEFT
      ],
      description: 'Posição do botão'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const FavoriteButtonWrapper = ({ isFavorite, size, position }: any) => {
  const [favorite, setFavorite] = useState(isFavorite)

  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        height: '150px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <span>Conteúdo do Card</span>
      <FavoriteButton
        isFavorite={favorite}
        onToggle={() => setFavorite(!favorite)}
        size={size}
        position={position}
      />
    </div>
  )
}

export const Default: Story = {
  render: args => <FavoriteButtonWrapper {...args} />,
  args: {
    isFavorite: false,
    size: ComponentSize.MEDIUM,
    position: Position.TOP_RIGHT
  }
}

export const Favorited: Story = {
  render: args => <FavoriteButtonWrapper {...args} />,
  args: {
    isFavorite: true,
    size: ComponentSize.MEDIUM,
    position: Position.TOP_RIGHT
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão no estado favorito'
      }
    }
  }
}

export const Small: Story = {
  render: args => <FavoriteButtonWrapper {...args} />,
  args: {
    isFavorite: false,
    size: ComponentSize.SMALL,
    position: Position.TOP_RIGHT
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão pequeno'
      }
    }
  }
}

export const Large: Story = {
  render: args => <FavoriteButtonWrapper {...args} />,
  args: {
    isFavorite: false,
    size: ComponentSize.LARGE,
    position: Position.TOP_RIGHT
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão grande'
      }
    }
  }
}

export const TopLeft: Story = {
  render: args => <FavoriteButtonWrapper {...args} />,
  args: {
    isFavorite: false,
    size: ComponentSize.MEDIUM,
    position: Position.TOP_LEFT
  },
  parameters: {
    docs: {
      description: {
        story: 'Posicionado no canto superior esquerdo'
      }
    }
  }
}

export const BottomRight: Story = {
  render: args => <FavoriteButtonWrapper {...args} />,
  args: {
    isFavorite: false,
    size: ComponentSize.MEDIUM,
    position: Position.BOTTOM_RIGHT
  },
  parameters: {
    docs: {
      description: {
        story: 'Posicionado no canto inferior direito'
      }
    }
  }
}

export const BottomLeft: Story = {
  render: args => <FavoriteButtonWrapper {...args} />,
  args: {
    isFavorite: false,
    size: ComponentSize.MEDIUM,
    position: Position.BOTTOM_LEFT
  },
  parameters: {
    docs: {
      description: {
        story: 'Posicionado no canto inferior esquerdo'
      }
    }
  }
}

export const SizeComparison: Story = {
  render: () => {
    const [favorites, setFavorites] = useState([false, false, false])

    return (
      <div style={{ display: 'flex', gap: '2rem' }}>
        {[ComponentSize.SMALL, ComponentSize.MEDIUM, ComponentSize.LARGE].map(
          (size, index) => (
            <div
              key={size}
              style={{
                position: 'relative',
                width: '150px',
                height: '120px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span>{size}</span>
              <FavoriteButton
                isFavorite={favorites[index]}
                onToggle={() => {
                  const newFavorites = [...favorites]
                  newFavorites[index] = !newFavorites[index]
                  setFavorites(newFavorites)
                }}
                size={size}
                position={Position.TOP_RIGHT}
              />
            </div>
          )
        )}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparação dos diferentes tamanhos'
      }
    }
  }
}

export const PositionComparison: Story = {
  render: () => {
    const [favorites, setFavorites] = useState([false, false, false, false])
    const positions = [
      Position.TOP_RIGHT,
      Position.TOP_LEFT,
      Position.BOTTOM_RIGHT,
      Position.BOTTOM_LEFT
    ]

    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {positions.map((position, index) => (
          <div
            key={position}
            style={{
              position: 'relative',
              width: '120px',
              height: '100px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ fontSize: '0.8rem' }}>{position}</span>
            <FavoriteButton
              isFavorite={favorites[index]}
              onToggle={() => {
                const newFavorites = [...favorites]
                newFavorites[index] = !newFavorites[index]
                setFavorites(newFavorites)
              }}
              size={ComponentSize.MEDIUM}
              position={position}
            />
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparação das diferentes posições'
      }
    }
  }
}
