import type { FilterType } from '@/types/filter'

export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  type: FilterType
  title: string
  placeholder?: string
  options?: FilterOption[]
  minValue?: number
  maxValue?: number
  step?: number
  unit?: string
  enabled: boolean
}

export interface FilterComponentProps {
  value: any
  onChange: (value: any) => void
  placeholder?: string
  options?: FilterOption[]
  minValue?: number
  maxValue?: number
  step?: number
  unit?: string
}

export interface FilterRenderer {
  type: FilterType
  component: React.ComponentType<FilterComponentProps>
}

export interface FilterRegistry {
  registerFilter(renderer: FilterRenderer): void
  getFilter(type: FilterType): FilterRenderer | undefined
  getAllFilters(): FilterRenderer[]
}
