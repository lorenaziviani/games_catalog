import React from 'react'
import DateRangeFilter from '../DateRangeFilter'
import type { FilterComponentProps } from '../types'

const DateRangeFilterAdapter: React.FC<FilterComponentProps> = ({
  value,
  onChange
}) => {
  const startDate = value?.start || null
  const endDate = value?.end || null

  const handleChange = (start: string | null, end: string | null) => {
    onChange({ start, end })
  }

  return (
    <DateRangeFilter
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
    />
  )
}

export default DateRangeFilterAdapter
