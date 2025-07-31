import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import MultiSelectFilter from './index.tsx'

interface MultiSelectFilterWrapperProps {
  options: Array<{ value: string; label: string }>
  selectedValues: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  isSingleSelect?: boolean
  onToggle?: () => void
}

const MultiSelectFilterWrapper = ({
  options,
  selectedValues,
  onChange,
  ...props
}: MultiSelectFilterWrapperProps) => {
  const [localSelectedValues, setLocalSelectedValues] = useState(selectedValues)

  const handleChange = (values: string[]) => {
    setLocalSelectedValues(values)
    onChange?.(values)
  }

  return (
    <MultiSelectFilter
      options={options}
      selectedValues={localSelectedValues}
      onChange={handleChange}
      {...props}
    />
  )
}

const meta: Meta<typeof MultiSelectFilter> = {
  title: 'Common/Forms/Filters/MultiSelectFilter',
  component: MultiSelectFilter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de filtro multi-seleção com dropdown, suporte a seleção única ou múltipla. Permite selecionar múltiplas opções com checkboxes ou uma única opção.'
      }
    }
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Array de opções disponíveis com value e label'
    },
    selectedValues: {
      control: 'object',
      description: 'Array de valores selecionados'
    },
    onChange: {
      action: 'changed',
      description: 'Callback chamado quando a seleção é alterada'
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder quando nenhuma opção está selecionada'
    },
    isSingleSelect: {
      control: 'boolean',
      description:
        'Se true, permite apenas uma seleção por vez (sem checkboxes)'
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback chamado quando o dropdown é aberto/fechado'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const mockGenres = [
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'rpg', label: 'RPG' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'sports', label: 'Sports' },
  { value: 'racing', label: 'Racing' },
  { value: 'puzzle', label: 'Puzzle' },
  { value: 'simulation', label: 'Simulation' }
]

const mockPlatforms = [
  { value: 'pc', label: 'PC' },
  { value: 'ps5', label: 'PlayStation 5' },
  { value: 'ps4', label: 'PlayStation 4' },
  { value: 'xbox', label: 'Xbox Series X' },
  { value: 'switch', label: 'Nintendo Switch' },
  { value: 'mobile', label: 'Mobile' }
]

const mockStores = [
  { value: 'steam', label: 'Steam' },
  { value: 'epic', label: 'Epic Games' },
  { value: 'gog', label: 'GOG' },
  { value: 'origin', label: 'Origin' },
  { value: 'uplay', label: 'Ubisoft Connect' },
  { value: 'battlenet', label: 'Battle.net' }
]

export const Default: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockGenres,
    selectedValues: [],
    placeholder: 'Selecione os gêneros...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro padrão para seleção múltipla de gêneros'
      }
    }
  }
}

export const WithSelection: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockGenres,
    selectedValues: ['action', 'adventure'],
    placeholder: 'Selecione os gêneros...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com algumas opções pré-selecionadas'
      }
    }
  }
}

export const SingleSelect: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockGenres,
    selectedValues: ['action'],
    placeholder: 'Selecione um gênero...',
    isSingleSelect: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com seleção única (sem checkboxes)'
      }
    }
  }
}

export const AllSelected: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockGenres,
    selectedValues: mockGenres.map(option => option.value),
    placeholder: 'Selecione os gêneros...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com todas as opções selecionadas'
      }
    }
  }
}

export const EmptyOptions: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: [],
    selectedValues: [],
    placeholder: 'Nenhuma opção disponível...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro sem opções disponíveis'
      }
    }
  }
}

export const Platforms: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockPlatforms,
    selectedValues: ['pc', 'ps5'],
    placeholder: 'Selecione as plataformas...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro para seleção de plataformas'
      }
    }
  }
}

export const Stores: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockStores,
    selectedValues: ['steam', 'epic'],
    placeholder: 'Selecione as lojas...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro para seleção de lojas de jogos'
      }
    }
  }
}

export const SingleSelectPlatform: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockPlatforms,
    selectedValues: ['pc'],
    placeholder: 'Selecione uma plataforma...',
    isSingleSelect: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Seleção única de plataforma'
      }
    }
  }
}

export const LongLabels: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: [
      {
        value: 'very-long-label',
        label: 'Este é um label muito longo que pode quebrar o layout'
      },
      {
        value: 'another-long',
        label: 'Outro label extremamente longo para testar o comportamento'
      },
      { value: 'normal', label: 'Label normal' },
      { value: 'short', label: 'Curto' }
    ],
    selectedValues: ['very-long-label'],
    placeholder: 'Selecione opções...'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Teste com labels muito longos para verificar o comportamento do layout'
      }
    }
  }
}

export const ManyOptions: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: [
      ...mockGenres,
      { value: 'indie', label: 'Indie' },
      { value: 'casual', label: 'Casual' },
      { value: 'horror', label: 'Horror' },
      { value: 'comedy', label: 'Comedy' },
      { value: 'drama', label: 'Drama' },
      { value: 'fantasy', label: 'Fantasy' },
      { value: 'sci-fi', label: 'Sci-Fi' },
      { value: 'mystery', label: 'Mystery' },
      { value: 'thriller', label: 'Thriller' },
      { value: 'romance', label: 'Romance' }
    ],
    selectedValues: ['action', 'rpg', 'indie'],
    placeholder: 'Selecione os gêneros...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com muitas opções para testar scroll'
      }
    }
  }
}

export const CustomPlaceholder: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockGenres,
    selectedValues: [],
    placeholder: 'Escolha seus gêneros favoritos...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com placeholder personalizado'
      }
    }
  }
}

export const NoSelection: Story = {
  render: args => <MultiSelectFilterWrapper {...args} />,
  args: {
    options: mockGenres,
    selectedValues: [],
    placeholder: 'Selecione os gêneros...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial sem nenhuma seleção'
      }
    }
  }
}
