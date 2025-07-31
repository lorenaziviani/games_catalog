import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import TextFilter from './index.tsx'

const TextFilterWrapper = ({ value, onChange, placeholder }: any) => {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (newValue: string) => {
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  return (
    <TextFilter
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
}

const meta: Meta<typeof TextFilter> = {
  title: 'Common/Forms/Filters/TextFilter',
  component: TextFilter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de filtro de texto com input controlado e suporte a placeholder'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Valor atual do input'
    },
    onChange: {
      action: 'changed',
      description: 'Callback chamado quando o valor é alterado'
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder do input'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <TextFilterWrapper {...args} />,
  args: {
    value: '',
    placeholder: 'Digite para buscar...'
  }
}

export const WithValue: Story = {
  render: args => <TextFilterWrapper {...args} />,
  args: {
    value: 'Zelda',
    placeholder: 'Digite para buscar...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com valor pré-definido'
      }
    }
  }
}

export const LongText: Story = {
  render: args => <TextFilterWrapper {...args} />,
  args: {
    value: 'The Legend of Zelda: Breath of the Wild',
    placeholder: 'Digite para buscar...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com texto longo'
      }
    }
  }
}

export const CustomPlaceholder: Story = {
  render: args => <TextFilterWrapper {...args} />,
  args: {
    value: '',
    placeholder: 'Buscar por nome do jogo...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com placeholder personalizado'
      }
    }
  }
}

export const EmptyPlaceholder: Story = {
  render: args => <TextFilterWrapper {...args} />,
  args: {
    value: '',
    placeholder: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro sem placeholder'
      }
    }
  }
}
