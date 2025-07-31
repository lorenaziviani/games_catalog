import { SortOption } from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Sort from './index'

const meta: Meta<typeof Sort> = {
  title: 'Common/Forms/Sort',
  component: Sort,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente de ordenação reutilizável para listar jogos por diferentes critérios'
      }
    }
  },
  argTypes: {
    currentSort: {
      control: 'select',
      options: [
        SortOption.NAME,
        SortOption.RATING,
        SortOption.RELEASE,
        SortOption.ADDED
      ],
      description: 'Opção de ordenação atual'
    },
    onSortChange: {
      action: 'sort-changed',
      description: 'Função chamada quando a ordenação muda'
    },
    showLabel: {
      control: 'boolean',
      description: 'Mostrar label "Ordenar por:"'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentSort: SortOption.ADDED,
    showLabel: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente de ordenação padrão com label'
      }
    }
  }
}

export const WithoutLabel: Story = {
  args: {
    currentSort: SortOption.RATING,
    showLabel: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente de ordenação sem label'
      }
    }
  }
}

export const ByName: Story = {
  args: {
    currentSort: SortOption.NAME,
    showLabel: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Ordenação por nome'
      }
    }
  }
}

export const ByRating: Story = {
  args: {
    currentSort: SortOption.RATING,
    showLabel: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Ordenação por avaliação'
      }
    }
  }
}

export const ByRelease: Story = {
  args: {
    currentSort: SortOption.RELEASE,
    showLabel: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Ordenação por data de lançamento'
      }
    }
  }
}
