import { DEFAULT_FILTERS } from '@/types/filter'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Filters from './index'

const meta: Meta<typeof Filters> = {
  title: 'Filters/Filters',
  component: Filters,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    filters: {
      control: { type: 'object' },
      description: 'Estado atual dos filtros'
    },
    onUpdateFilter: {
      action: 'filter updated',
      description: 'Callback quando um filtro é atualizado'
    },
    onResetFilters: {
      action: 'filters reset',
      description: 'Callback para resetar filtros'
    },

    hasActiveFilters: {
      control: { type: 'boolean' },
      description: 'Se há filtros ativos'
    },
    activeFiltersCount: {
      control: { type: 'number' },
      description: 'Número de filtros ativos'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const mockAvailableOptions = [
  { value: 'action', label: 'Action', count: 150 },
  { value: 'adventure', label: 'Adventure', count: 120 },
  { value: 'rpg', label: 'RPG', count: 80 },
  { value: 'strategy', label: 'Strategy', count: 60 },
  { value: 'sports', label: 'Sports', count: 45 }
]

export const Default: Story = {
  args: {
    filters: DEFAULT_FILTERS,
    onUpdateFilter: (type, value) =>
      console.log('Filter updated:', { type, value }),
    onResetFilters: () => console.log('Filters reset'),
    hasActiveFilters: false,
    activeFiltersCount: 0,
    availableGenres: mockAvailableOptions,
    availablePlatforms: mockAvailableOptions,
    availableStores: mockAvailableOptions,
    availableTags: mockAvailableOptions
  }
}

export const WithActiveFilters: Story = {
  args: {
    filters: {
      ...DEFAULT_FILTERS,
      name: 'Zelda',
      genres: ['action', 'adventure'],
      platforms: ['pc'],
      metacriticRange: { min: 70, max: 100 }
    },
    onUpdateFilter: (type, value) =>
      console.log('Filter updated:', { type, value }),
    onResetFilters: () => console.log('Filters reset'),
    hasActiveFilters: true,
    activeFiltersCount: 5,
    availableGenres: mockAvailableOptions,
    availablePlatforms: mockAvailableOptions,
    availableStores: mockAvailableOptions,
    availableTags: mockAvailableOptions
  }
}

export const EmptyOptions: Story = {
  args: {
    filters: DEFAULT_FILTERS,
    onUpdateFilter: (type, value) =>
      console.log('Filter updated:', { type, value }),
    onResetFilters: () => console.log('Filters reset'),
    hasActiveFilters: false,
    activeFiltersCount: 0,
    availableGenres: [],
    availablePlatforms: [],
    availableStores: [],
    availableTags: []
  }
}
