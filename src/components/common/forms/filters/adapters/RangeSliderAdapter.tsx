import RangeSlider from '@/components/common/forms/filters/RangeSlider'
import type { FilterComponentProps } from '@/components/common/forms/filters/types'
import React from 'react'

const RangeSliderAdapter: React.FC<FilterComponentProps> = ({
  value,
  onChange,
  minValue = 0,
  maxValue = 100,
  step = 1,
  unit = ''
}) => {
  const min =
    typeof value === 'object' && 'min' in value
      ? (value as { min: number; max: number }).min
      : minValue
  const max =
    typeof value === 'object' && 'max' in value
      ? (value as { min: number; max: number }).max
      : maxValue

  const handleChange = (min: number, max: number) => {
    onChange({ min, max })
  }

  return (
    <RangeSlider
      min={min}
      max={max}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      onChange={handleChange}
      label="Selecione a faixa"
      unit={unit}
    />
  )
}

export default RangeSliderAdapter
