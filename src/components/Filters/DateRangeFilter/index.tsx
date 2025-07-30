import { useCallback } from 'react'
import * as S from './styles'

interface DateRangeFilterProps {
  startDate: string
  endDate: string
  onChange: (start: string, end: string) => void
}

const DateRangeFilter = ({
  startDate,
  endDate,
  onChange
}: DateRangeFilterProps) => {
  const handleStartDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value, endDate)
    },
    [onChange, endDate]
  )

  const handleEndDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(startDate, e.target.value)
    },
    [onChange, startDate]
  )

  return (
    <S.Container>
      <S.DateInput
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        placeholder="Data inicial"
      />
      <S.Separator>até</S.Separator>
      <S.DateInput
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        placeholder="Data final"
      />
    </S.Container>
  )
}

export default DateRangeFilter
