import type { Meta, StoryObj } from '@storybook/react-vite'
import FilterSection from './index.tsx'

const meta: Meta<typeof FilterSection> = {
  title: 'Common/Forms/Filters/FilterSection',
  component: FilterSection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de seção de filtro que agrupa elementos de filtro com um título'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título da seção de filtro'
    },
    children: {
      control: false,
      description: 'Conteúdo da seção de filtro'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Gêneros',
    children: (
      <div style={{ padding: '10px', border: '1px dashed #ccc' }}>
        Conteúdo do filtro aqui
      </div>
    )
  }
}

export const WithLongTitle: Story = {
  args: {
    title: 'Filtros de Avaliação e Classificação',
    children: (
      <div style={{ padding: '10px', border: '1px dashed #ccc' }}>
        Conteúdo do filtro aqui
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Seção com título longo'
      }
    }
  }
}

export const WithComplexContent: Story = {
  args: {
    title: 'Plataformas',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ padding: '10px', border: '1px dashed #ccc' }}>
          Checkbox 1
        </div>
        <div style={{ padding: '10px', border: '1px dashed #ccc' }}>
          Checkbox 2
        </div>
        <div style={{ padding: '10px', border: '1px dashed #ccc' }}>
          Checkbox 3
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Seção com conteúdo complexo (múltiplos elementos)'
      }
    }
  }
}

export const EmptyContent: Story = {
  args: {
    title: 'Filtros Vazios',
    children: null
  },
  parameters: {
    docs: {
      description: {
        story: 'Seção sem conteúdo'
      }
    }
  }
}

export const ShortTitle: Story = {
  args: {
    title: 'A',
    children: (
      <div style={{ padding: '10px', border: '1px dashed #ccc' }}>
        Conteúdo do filtro aqui
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Seção com título muito curto'
      }
    }
  }
}
