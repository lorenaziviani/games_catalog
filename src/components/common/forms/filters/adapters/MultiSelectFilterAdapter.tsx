import React from 'react'
import MultiSelectFilter from '../MultiSelectFilter'
import type { FilterComponentProps } from '../types'

const MultiSelectFilterAdapter: React.FC<FilterComponentProps> = ({
  value,
  onChange,
  options = [],
  placeholder
}) => {
  return (
    <MultiSelectFilter
      options={options}
      selectedValues={value || []}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default MultiSelectFilterAdapter
