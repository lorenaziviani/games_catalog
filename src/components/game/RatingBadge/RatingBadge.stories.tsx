import { RatingBadgeSize } from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import RatingBadge from './index'

const meta: Meta<typeof RatingBadge> = {
  title: 'Game/RatingBadge',
  component: RatingBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de badge de rating com cores baseadas no tema'
      }
    }
  },
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Rating do jogo (0-5)'
    },
    showIcon: {
      control: 'boolean',
      description: 'Mostrar ícone de estrela'
    },
    size: {
      control: { type: 'select' },
      options: [
        RatingBadgeSize.SMALL,
        RatingBadgeSize.MEDIUM,
        RatingBadgeSize.LARGE
      ],
      description: 'Tamanho do badge'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rating: 4.5,
    showIcon: true,
    size: RatingBadgeSize.MEDIUM
  }
}

export const Excellent: Story = {
  args: {
    rating: 4.8,
    showIcon: true,
    size: RatingBadgeSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating excelente (4.5+) - cor verde'
      }
    }
  }
}

export const Good: Story = {
  args: {
    rating: 4.2,
    showIcon: true,
    size: RatingBadgeSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating bom (4.0-4.4) - cor verde claro'
      }
    }
  }
}

export const Average: Story = {
  args: {
    rating: 3.7,
    showIcon: true,
    size: RatingBadgeSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating médio (3.5-3.9) - cor amarela'
      }
    }
  }
}

export const Poor: Story = {
  args: {
    rating: 3.2,
    showIcon: true,
    size: RatingBadgeSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating ruim (3.0-3.4) - cor laranja'
      }
    }
  }
}

export const Bad: Story = {
  args: {
    rating: 2.5,
    showIcon: true,
    size: RatingBadgeSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating ruim (<3.0) - cor vermelha'
      }
    }
  }
}

export const WithoutIcon: Story = {
  args: {
    rating: 4.5,
    showIcon: false,
    size: RatingBadgeSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge sem ícone de estrela'
      }
    }
  }
}

export const Small: Story = {
  args: {
    rating: 4.5,
    showIcon: true,
    size: RatingBadgeSize.SMALL
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamanho pequeno'
      }
    }
  }
}

export const Large: Story = {
  args: {
    rating: 4.5,
    showIcon: true,
    size: RatingBadgeSize.LARGE
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamanho grande'
      }
    }
  }
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div
        style={{
          position: 'relative',
          height: '60px',
          backgroundColor: '#f0f0f0',
          padding: '1rem'
        }}
      >
        <RatingBadge rating={4.8} size={RatingBadgeSize.SMALL} />
        <span style={{ marginLeft: '120px' }}>Small</span>
      </div>
      <div
        style={{
          position: 'relative',
          height: '60px',
          backgroundColor: '#f0f0f0',
          padding: '1rem'
        }}
      >
        <RatingBadge rating={4.2} size={RatingBadgeSize.MEDIUM} />
        <span style={{ marginLeft: '120px' }}>Medium</span>
      </div>
      <div
        style={{
          position: 'relative',
          height: '60px',
          backgroundColor: '#f0f0f0',
          padding: '1rem'
        }}
      >
        <RatingBadge rating={3.7} size={RatingBadgeSize.LARGE} />
        <span style={{ marginLeft: '120px' }}>Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todos os tamanhos disponíveis'
      }
    }
  }
}
