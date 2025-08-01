import { ComponentSize, TagVariant } from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Tag from './index'

const meta: Meta<typeof Tag> = {
  title: 'Common/UI/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de tag com diferentes variantes e tamanhos'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [TagVariant.GENRE, TagVariant.PLATFORM],
      description: 'Variante da tag'
    },
    size: {
      control: 'select',
      options: [ComponentSize.SMALL, ComponentSize.MEDIUM, ComponentSize.LARGE],
      description: 'Tamanho da tag'
    },
    children: {
      control: 'text',
      description: 'Conteúdo da tag'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'RPG',
    variant: TagVariant.GENRE,
    size: ComponentSize.MEDIUM
  }
}

export const Genre: Story = {
  args: {
    children: 'Adventure',
    variant: TagVariant.GENRE,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag de gênero com estilo padrão'
      }
    }
  }
}

export const Platform: Story = {
  args: {
    children: 'PC',
    variant: TagVariant.PLATFORM,
    size: ComponentSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag de plataforma com estilo diferenciado'
      }
    }
  }
}

export const Small: Story = {
  args: {
    children: 'RPG',
    variant: TagVariant.GENRE,
    size: ComponentSize.SMALL
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag pequena para espaços reduzidos'
      }
    }
  }
}

export const Large: Story = {
  args: {
    children: 'RPG',
    variant: TagVariant.GENRE,
    size: ComponentSize.LARGE
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag grande para destaque visual'
      }
    }
  }
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Tag variant={TagVariant.GENRE} size={ComponentSize.MEDIUM}>
        RPG
      </Tag>
      <Tag variant={TagVariant.GENRE} size={ComponentSize.MEDIUM}>
        Adventure
      </Tag>
      <Tag variant={TagVariant.PLATFORM} size={ComponentSize.MEDIUM}>
        PC
      </Tag>
      <Tag variant={TagVariant.PLATFORM} size={ComponentSize.MEDIUM}>
        PlayStation
      </Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todas as variantes disponíveis'
      }
    }
  }
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Tag variant={TagVariant.GENRE} size={ComponentSize.SMALL}>
        RPG
      </Tag>
      <Tag variant={TagVariant.GENRE} size={ComponentSize.MEDIUM}>
        RPG
      </Tag>
      <Tag variant={TagVariant.GENRE} size={ComponentSize.LARGE}>
        RPG
      </Tag>
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

export const MixedContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Tag variant={TagVariant.GENRE} size={ComponentSize.MEDIUM}>
          RPG
        </Tag>
        <Tag variant={TagVariant.PLATFORM} size={ComponentSize.MEDIUM}>
          PC
        </Tag>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Tag variant={TagVariant.GENRE} size={ComponentSize.MEDIUM}>
          Adventure
        </Tag>
        <Tag variant={TagVariant.PLATFORM} size={ComponentSize.MEDIUM}>
          PlayStation
        </Tag>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mistura de tags de gênero e plataforma'
      }
    }
  }
}
