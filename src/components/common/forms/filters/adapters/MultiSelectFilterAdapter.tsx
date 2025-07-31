import React from 'react'
import MultiSelectFilter from '@/components/common/forms/filters/MultiSelectFilter'
import type { FilterComponentProps } from '@/components/common/forms/filters/types'

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
