import React from 'react'
import RangeSlider from '../RangeSlider'
import type { FilterComponentProps } from '../types'

const RangeSliderAdapter: React.FC<FilterComponentProps> = ({
  value,
  onChange,
  minValue = 0,
  maxValue = 100,
  step = 1,
  unit = ''
}) => {
  const min = value?.min || minValue
  const max = value?.max || maxValue

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
