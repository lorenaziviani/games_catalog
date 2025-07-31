import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import RangeSlider from './index.tsx'

interface RangeSliderWrapperProps {
  min: number
  max: number
  minValue: number
  maxValue: number
  step: number
  onChange?: (min: number, max: number) => void
  label?: string
  unit?: string
}

const RangeSliderWrapper = ({
  min,
  max,
  minValue,
  maxValue,
  step,
  onChange,
  label,
  unit
}: RangeSliderWrapperProps) => {
  const [localMin, setLocalMin] = useState(minValue)
  const [localMax, setLocalMax] = useState(maxValue)

  const handleChange = (newMin: number, newMax: number) => {
    setLocalMin(newMin)
    setLocalMax(newMax)
    onChange?.(newMin, newMax)
  }

  return (
    <RangeSlider
      min={min}
      max={max}
      minValue={localMin}
      maxValue={localMax}
      step={step}
      onChange={handleChange}
      label={label}
      unit={unit}
    />
  )
}

const meta: Meta<typeof RangeSlider> = {
  title: 'Common/Forms/Filters/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de slider de intervalo com dois controles para definir valores mínimo e máximo'
      }
    }
  },
  argTypes: {
    min: {
      control: 'number',
      description: 'Valor mínimo do slider'
    },
    max: {
      control: 'number',
      description: 'Valor máximo do slider'
    },
    minValue: {
      control: 'number',
      description: 'Valor atual mínimo selecionado'
    },
    maxValue: {
      control: 'number',
      description: 'Valor atual máximo selecionado'
    },
    step: {
      control: 'number',
      description: 'Incremento do slider'
    },
    onChange: {
      action: 'changed',
      description: 'Callback chamado quando os valores são alterados'
    },
    label: {
      control: 'text',
      description: 'Label opcional do slider'
    },
    unit: {
      control: 'text',
      description: 'Unidade de medida (ex: %, $, etc.)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <RangeSliderWrapper {...args} />,
  args: {
    min: 0,
    max: 100,
    minValue: 20,
    maxValue: 80,
    step: 1,
    label: 'Faixa de preço',
    unit: '%'
  }
}

export const PriceRange: Story = {
  render: args => <RangeSliderWrapper {...args} />,
  args: {
    min: 0,
    max: 500,
    minValue: 50,
    maxValue: 200,
    step: 10,
    label: 'Faixa de preço',
    unit: ' R$'
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider para faixa de preço em reais'
      }
    }
  }
}

export const RatingRange: Story = {
  render: args => <RangeSliderWrapper {...args} />,
  args: {
    min: 0,
    max: 5,
    minValue: 3,
    maxValue: 5,
    step: 0.1,
    label: 'Faixa de avaliação',
    unit: '★'
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider para faixa de avaliação com estrelas'
      }
    }
  }
}

export const WithoutLabel: Story = {
  render: args => <RangeSliderWrapper {...args} />,
  args: {
    min: 0,
    max: 100,
    minValue: 25,
    maxValue: 75,
    step: 5,
    unit: '%'
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider sem label'
      }
    }
  }
}

export const WithoutUnit: Story = {
  render: args => <RangeSliderWrapper {...args} />,
  args: {
    min: 0,
    max: 1000,
    minValue: 100,
    maxValue: 500,
    step: 50,
    label: 'Faixa de valores'
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider sem unidade de medida'
      }
    }
  }
}

export const SmallRange: Story = {
  render: args => <RangeSliderWrapper {...args} />,
  args: {
    min: 0,
    max: 10,
    minValue: 2,
    maxValue: 8,
    step: 1,
    label: 'Faixa pequena',
    unit: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider com faixa pequena de valores'
      }
    }
  }
}

export const SameValues: Story = {
  render: args => <RangeSliderWrapper {...args} />,
  args: {
    min: 0,
    max: 100,
    minValue: 50,
    maxValue: 50,
    step: 1,
    label: 'Valores iguais',
    unit: '%'
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider com valores mínimo e máximo iguais'
      }
    }
  }
}
