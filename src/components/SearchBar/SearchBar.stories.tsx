import type { Meta, StoryObj } from '@storybook/react-vite'
import { LightTheme } from '@styles/theme'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import SearchBar from './index'

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de barra de busca com ícone e placeholder customizável'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Valor atual do campo de busca'
    },
    onChange: {
      action: 'changed',
      description: 'Callback chamado quando o valor muda'
    },
    placeholder: {
      control: 'text',
      description: 'Texto do placeholder'
    },
    maxWidth: {
      control: 'text',
      description: 'Largura máxima do componente'
    }
  },
  decorators: [
    Story => (
      <ThemeProvider theme={LightTheme}>
        <div style={{ padding: '2rem', width: '100%' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

// Componente wrapper para gerenciar estado
const SearchBarWithState = (props: any) => {
  const [value, setValue] = useState(props.value || '')

  return (
    <SearchBar
      {...props}
      value={value}
      onChange={newValue => {
        setValue(newValue)
        props.onChange?.(newValue)
      }}
    />
  )
}

export const Default: Story = {
  render: args => <SearchBarWithState {...args} />,
  args: {
    placeholder: 'Buscar jogos...',
    maxWidth: '400px',
    value: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Barra de busca padrão com placeholder customizado'
      }
    }
  }
}

export const WithInitialValue: Story = {
  render: args => <SearchBarWithState {...args} />,
  args: {
    placeholder: 'Buscar jogos...',
    maxWidth: '400px',
    value: 'The Witcher'
  },
  parameters: {
    docs: {
      description: {
        story: 'Barra de busca com valor inicial preenchido'
      }
    }
  }
}

export const CustomPlaceholder: Story = {
  render: args => <SearchBarWithState {...args} />,
  args: {
    placeholder: 'Digite o nome do jogo...',
    maxWidth: '400px',
    value: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Barra de busca com placeholder personalizado'
      }
    }
  }
}

export const WideSearchBar: Story = {
  render: args => <SearchBarWithState {...args} />,
  args: {
    placeholder: 'Buscar jogos...',
    maxWidth: '600px',
    value: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Barra de busca com largura maior'
      }
    }
  }
}

export const NarrowSearchBar: Story = {
  render: args => <SearchBarWithState {...args} />,
  args: {
    placeholder: 'Buscar...',
    maxWidth: '250px',
    value: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Barra de busca com largura menor'
      }
    }
  }
}

export const LongSearchTerm: Story = {
  render: args => <SearchBarWithState {...args} />,
  args: {
    placeholder: 'Buscar jogos...',
    maxWidth: '400px',
    value: 'Red Dead Redemption 2: Wild West Adventure'
  },
  parameters: {
    docs: {
      description: {
        story: 'Barra de busca com termo de busca longo'
      }
    }
  }
}

export const EmptyState: Story = {
  render: args => <SearchBarWithState {...args} />,
  args: {
    placeholder: 'Buscar jogos...',
    maxWidth: '400px',
    value: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado vazio da barra de busca'
      }
    }
  }
}

export const DifferentPlaceholders: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SearchBarWithState
        placeholder="Buscar jogos..."
        maxWidth="400px"
        value=""
      />
      <SearchBarWithState
        placeholder="Filtrar por gênero..."
        maxWidth="400px"
        value=""
      />
      <SearchBarWithState
        placeholder="Procurar por plataforma..."
        maxWidth="400px"
        value=""
      />
      <SearchBarWithState
        placeholder="Ordenar por avaliação..."
        maxWidth="400px"
        value=""
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tipos de placeholder para diferentes contextos'
      }
    }
  }
}

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Pequeno (250px)</h4>
        <SearchBarWithState placeholder="Buscar..." maxWidth="250px" value="" />
      </div>
      <div>
        <h4>Médio (400px)</h4>
        <SearchBarWithState
          placeholder="Buscar jogos..."
          maxWidth="400px"
          value=""
        />
      </div>
      <div>
        <h4>Grande (600px)</h4>
        <SearchBarWithState
          placeholder="Buscar jogos populares..."
          maxWidth="600px"
          value=""
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de diferentes tamanhos de barra de busca'
      }
    }
  }
}
