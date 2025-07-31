import { ComponentSize, TagVariant } from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import TagsContainer from './index'

const meta: Meta<typeof TagsContainer> = {
  title: 'Common/UI/TagsContainer',
  component: TagsContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container que exibe múltiplas tags com limite configurável'
      }
    }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array de itens com id e name'
    },
    variant: {
      control: 'select',
      options: [TagVariant.GENRE, TagVariant.PLATFORM],
      description: 'Variante das tags (gênero ou plataforma)'
    },
    maxItems: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número máximo de tags a exibir'
    },
    size: {
      control: 'select',
      options: [ComponentSize.SMALL, ComponentSize.MEDIUM, ComponentSize.LARGE],
      description: 'Tamanho das tags'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const mockGenres = [
  { id: 1, name: 'RPG' },
  { id: 2, name: 'Adventure' },
  { id: 3, name: 'Action' },
  { id: 4, name: 'Strategy' },
  { id: 5, name: 'Sports' },
  { id: 6, name: 'Racing' }
]

const mockPlatforms = [
  { id: 1, name: 'PC' },
  { id: 2, name: 'PlayStation' },
  { id: 3, name: 'Xbox' },
  { id: 4, name: 'Nintendo Switch' },
  { id: 5, name: 'Mobile' },
  { id: 6, name: 'VR' }
]

export const Default: Story = {
  args: {
    items: mockGenres,
    variant: TagVariant.GENRE,
    maxItems: 3,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Container padrão com tags de gênero'
      }
    }
  }
}

export const GenreTags: Story = {
  args: {
    items: mockGenres,
    variant: TagVariant.GENRE,
    maxItems: 4,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Container com tags de gênero de jogos'
      }
    }
  }
}

export const PlatformTags: Story = {
  args: {
    items: mockPlatforms,
    variant: TagVariant.PLATFORM,
    maxItems: 3,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Container com tags de plataformas'
      }
    }
  }
}

export const SmallTags: Story = {
  args: {
    items: mockGenres,
    variant: TagVariant.GENRE,
    maxItems: 5,
    size: ComponentSize.SMALL
  },
  parameters: {
    docs: {
      description: {
        story: 'Container com tags pequenas'
      }
    }
  }
}

export const LargeTags: Story = {
  args: {
    items: mockPlatforms,
    variant: TagVariant.PLATFORM,
    maxItems: 3,
    size: ComponentSize.LARGE
  },
  parameters: {
    docs: {
      description: {
        story: 'Container com tags grandes'
      }
    }
  }
}

export const ManyItems: Story = {
  args: {
    items: mockGenres,
    variant: TagVariant.GENRE,
    maxItems: 6,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Container com muitas tags (máximo 6)'
      }
    }
  }
}

export const LimitedItems: Story = {
  args: {
    items: mockPlatforms,
    variant: TagVariant.PLATFORM,
    maxItems: 2,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Container com limite baixo de tags (máximo 2)'
      }
    }
  }
}

export const SingleItem: Story = {
  args: {
    items: [{ id: 1, name: 'RPG' }],
    variant: TagVariant.GENRE,
    maxItems: 3,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Container com apenas uma tag'
      }
    }
  }
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Small Tags</h4>
        <TagsContainer
          items={mockGenres.slice(0, 3)}
          variant={TagVariant.GENRE}
          maxItems={3}
          size={ComponentSize.SMALL}
        />
      </div>
      <div>
        <h4>Medium Tags</h4>
        <TagsContainer
          items={mockGenres.slice(0, 3)}
          variant={TagVariant.GENRE}
          maxItems={3}
          size={ComponentSize.MEDIUM}
        />
      </div>
      <div>
        <h4>Large Tags</h4>
        <TagsContainer
          items={mockGenres.slice(0, 3)}
          variant={TagVariant.GENRE}
          maxItems={3}
          size={ComponentSize.LARGE}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todos os tamanhos de tags'
      }
    }
  }
}

export const DifferentVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>Genre Tags</h4>
        <TagsContainer
          items={mockGenres.slice(0, 4)}
          variant={TagVariant.GENRE}
          maxItems={4}
          size={ComponentSize.MEDIUM}
        />
      </div>
      <div>
        <h4>Platform Tags</h4>
        <TagsContainer
          items={mockPlatforms.slice(0, 4)}
          variant={TagVariant.PLATFORM}
          maxItems={4}
          size={ComponentSize.MEDIUM}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de tags de gênero e plataforma'
      }
    }
  }
}

export const OverflowTest: Story = {
  args: {
    items: mockGenres,
    variant: TagVariant.GENRE,
    maxItems: 2,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story:
          'Teste de overflow - mostra apenas 2 tags mesmo tendo 6 disponíveis'
      }
    }
  }
}
