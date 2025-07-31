import {
  RANGE_SLIDER_CONSTRAINTS,
  RANGE_SLIDER_EVENTS,
  RangeSliderThumbType
} from '@/types/common'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as S from './styles'

interface RangeSliderProps {
  min: number
  max: number
  minValue: number
  maxValue: number
  step: number
  onChange: (min: number, max: number) => void
  label?: string
  unit?: string
}

const RangeSlider = ({
  min,
  max,
  minValue,
  maxValue,
  step,
  onChange,
  label,
  unit = ''
}: RangeSliderProps) => {
  const [isDragging, setIsDragging] = useState<RangeSliderThumbType | null>(
    null
  )
  const sliderRef = useRef<HTMLDivElement>(null)

  const getPercentage = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * 100
  }

  const getValueFromPercentage = useCallback(
    (percentage: number) => {
      return minValue + (percentage / 100) * (maxValue - minValue)
    },
    [minValue, maxValue]
  )

  const handleMouseDown = (e: React.MouseEvent, type: RangeSliderThumbType) => {
    e.preventDefault()
    setIsDragging(type)
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const percentage = Math.max(
        RANGE_SLIDER_CONSTRAINTS.MIN_PERCENTAGE,
        Math.min(
          RANGE_SLIDER_CONSTRAINTS.MAX_PERCENTAGE,
          ((e.clientX - rect.left) / rect.width) * 100
        )
      )
      const value = Math.round(getValueFromPercentage(percentage) / step) * step

      if (isDragging === RangeSliderThumbType.MIN) {
        const newMin = Math.min(value, max)
        onChange(newMin, max)
      } else {
        const newMax = Math.max(value, min)
        onChange(min, newMax)
      }
    },
    [isDragging, max, min, onChange, step, getValueFromPercentage]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  const handleTouchStart = (
    e: React.TouchEvent,
    type: RangeSliderThumbType
  ) => {
    e.preventDefault()
    setIsDragging(type)
  }

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      const percentage = Math.max(
        RANGE_SLIDER_CONSTRAINTS.MIN_PERCENTAGE,
        Math.min(
          RANGE_SLIDER_CONSTRAINTS.MAX_PERCENTAGE,
          ((touch.clientX - rect.left) / rect.width) * 100
        )
      )
      const value = Math.round(getValueFromPercentage(percentage) / step) * step

      if (isDragging === RangeSliderThumbType.MIN) {
        const newMin = Math.min(value, max)
        onChange(newMin, max)
      } else {
        const newMax = Math.max(value, min)
        onChange(min, newMax)
      }
    },
    [isDragging, max, min, onChange, step, getValueFromPercentage]
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(null)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener(RANGE_SLIDER_EVENTS.MOUSE_MOVE, handleMouseMove)
      document.addEventListener(RANGE_SLIDER_EVENTS.MOUSE_UP, handleMouseUp)
      document.addEventListener(
        RANGE_SLIDER_EVENTS.TOUCH_MOVE,
        handleTouchMove,
        {
          passive: RANGE_SLIDER_CONSTRAINTS.TOUCH_PASSIVE
        }
      )
      document.addEventListener(RANGE_SLIDER_EVENTS.TOUCH_END, handleTouchEnd)
    }

    return () => {
      document.removeEventListener(
        RANGE_SLIDER_EVENTS.MOUSE_MOVE,
        handleMouseMove
      )
      document.removeEventListener(RANGE_SLIDER_EVENTS.MOUSE_UP, handleMouseUp)
      document.removeEventListener(
        RANGE_SLIDER_EVENTS.TOUCH_MOVE,
        handleTouchMove
      )
      document.removeEventListener(
        RANGE_SLIDER_EVENTS.TOUCH_END,
        handleTouchEnd
      )
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd
  ])

  const minPercentage = getPercentage(min)
  const maxPercentage = getPercentage(max)

  return (
    <S.Container>
      {label && <S.Label>{label}</S.Label>}
      <S.SliderContainer ref={sliderRef}>
        <S.Track>
          <S.Range $left={minPercentage} $right={100 - maxPercentage} />
        </S.Track>
        <S.Thumb
          $position={minPercentage}
          onMouseDown={(e: React.MouseEvent) =>
            handleMouseDown(e, RangeSliderThumbType.MIN)
          }
          onTouchStart={(e: React.TouchEvent) =>
            handleTouchStart(e, RangeSliderThumbType.MIN)
          }
        />
        <S.Thumb
          $position={maxPercentage}
          onMouseDown={(e: React.MouseEvent) =>
            handleMouseDown(e, RangeSliderThumbType.MAX)
          }
          onTouchStart={(e: React.TouchEvent) =>
            handleTouchStart(e, RangeSliderThumbType.MAX)
          }
        />
      </S.SliderContainer>
      <S.Values>
        <S.Value>
          {min}
          {unit}
        </S.Value>
        <S.Value>
          {max}
          {unit}
        </S.Value>
      </S.Values>
    </S.Container>
  )
}

export default RangeSlider
