import DateRangeFilter from '@/components/common/forms/filters/DateRangeFilter'
import type { FilterComponentProps } from '@/components/common/forms/filters/types'
import React from 'react'

const DateRangeFilterAdapter: React.FC<FilterComponentProps> = ({
  value,
  onChange
}) => {
  const startDate =
    typeof value === 'object' && 'start' in value
      ? (value as { start: string; end: string }).start
      : ''
  const endDate =
    typeof value === 'object' && 'end' in value
      ? (value as { start: string; end: string }).end
      : ''

  const handleChange = (start: string, end: string) => {
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
