import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import DateRangeFilter from './index.tsx'

const DateRangeFilterWrapper = ({ startDate, endDate, onChange }: any) => {
  const [localStartDate, setLocalStartDate] = useState(startDate)
  const [localEndDate, setLocalEndDate] = useState(endDate)

  const handleChange = (newStart: string, newEnd: string) => {
    setLocalStartDate(newStart)
    setLocalEndDate(newEnd)
    onChange?.(newStart, newEnd)
  }

  return (
    <DateRangeFilter
      startDate={localStartDate}
      endDate={localEndDate}
      onChange={handleChange}
    />
  )
}

const meta: Meta<typeof DateRangeFilter> = {
  title: 'Common/Forms/Filters/DateRangeFilter',
  component: DateRangeFilter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de filtro para seleção de intervalo de datas com inputs de data inicial e final'
      }
    }
  },
  argTypes: {
    startDate: {
      control: 'date',
      description: 'Data inicial do intervalo'
    },
    endDate: {
      control: 'date',
      description: 'Data final do intervalo'
    },
    onChange: {
      action: 'changed',
      description: 'Callback chamado quando as datas são alteradas'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => <DateRangeFilterWrapper {...args} />,
  args: {
    startDate: '2023-01-01',
    endDate: '2023-12-31'
  }
}

export const EmptyDates: Story = {
  render: args => <DateRangeFilterWrapper {...args} />,
  args: {
    startDate: '',
    endDate: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com datas vazias'
      }
    }
  }
}

export const SameDate: Story = {
  render: args => <DateRangeFilterWrapper {...args} />,
  args: {
    startDate: '2023-06-15',
    endDate: '2023-06-15'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com data inicial e final iguais'
      }
    }
  }
}

export const FutureDates: Story = {
  render: args => <DateRangeFilterWrapper {...args} />,
  args: {
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  },
  parameters: {
    docs: {
      description: {
        story: 'Filtro com datas futuras'
      }
    }
  }
}
