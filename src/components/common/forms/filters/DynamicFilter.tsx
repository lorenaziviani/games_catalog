import type { FilterType } from '@/types/filter'
import React from 'react'
import { filterRegistry } from './FilterRegistry'
import type { FilterComponentProps } from './types'

interface DynamicFilterProps {
  type: FilterType
  value:
    | string
    | number
    | string[]
    | { start: string; end: string }
    | { min: number; max: number }
  onChange: (
    value:
      | string
      | number
      | string[]
      | { start: string; end: string }
      | { min: number; max: number }
  ) => void
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  minValue?: number
  maxValue?: number
  step?: number
  unit?: string
}

const DynamicFilter: React.FC<DynamicFilterProps> = ({
  type,
  value,
  onChange,
  placeholder,
  options,
  minValue,
  maxValue,
  step,
  unit
}) => {
  const filterRenderer = filterRegistry.getFilter(type)

  if (!filterRenderer) {
    console.warn(`Filter type '${type}' not found in registry`)
    return null
  }

  const FilterComponent = filterRenderer.component
  const props: FilterComponentProps = {
    value,
    onChange,
    placeholder,
    options,
    minValue,
    maxValue,
    step,
    unit
  }

  return <FilterComponent {...props} />
}

export default DynamicFilter
