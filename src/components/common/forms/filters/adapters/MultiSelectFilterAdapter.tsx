import MultiSelectFilter from '@/components/common/forms/filters/MultiSelectFilter'
import type { FilterComponentProps } from '@/components/common/forms/filters/types'
import React from 'react'

const MultiSelectFilterAdapter: React.FC<FilterComponentProps> = ({
  value,
  onChange,
  options = [],
  placeholder
}) => {
  return (
    <MultiSelectFilter
      options={options}
      selectedValues={(value as string[]) || []}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default MultiSelectFilterAdapter
