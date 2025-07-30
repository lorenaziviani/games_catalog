import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { isDarkMode } from '../../../utils/themeUtils'

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
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getPercentage = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * 100
  }

  const getValueFromPercentage = (percentage: number) => {
    return minValue + (percentage / 100) * (maxValue - minValue)
  }

  const handleMouseDown = (e: React.MouseEvent, type: 'min' | 'max') => {
    e.preventDefault()
    setIsDragging(type)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    )
    const value = Math.round(getValueFromPercentage(percentage) / step) * step

    if (isDragging === 'min') {
      const newMin = Math.min(value, max)
      onChange(newMin, max)
    } else {
      const newMax = Math.max(value, min)
      onChange(min, newMax)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  const handleTouchStart = (e: React.TouchEvent, type: 'min' | 'max') => {
    e.preventDefault()
    setIsDragging(type)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const percentage = Math.max(
      0,
      Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)
    )
    const value = Math.round(getValueFromPercentage(percentage) / step) * step

    if (isDragging === 'min') {
      const newMin = Math.min(value, max)
      onChange(newMin, max)
    } else {
      const newMax = Math.max(value, min)
      onChange(min, newMax)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(null)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false
      })
      document.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  const minPercentage = getPercentage(min)
  const maxPercentage = getPercentage(max)

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <SliderContainer ref={sliderRef}>
        <Track>
          <Range min={minPercentage} max={maxPercentage} />
        </Track>
        <Thumb
          style={{ left: `${minPercentage}%` }}
          onMouseDown={e => handleMouseDown(e, 'min')}
          onTouchStart={e => handleTouchStart(e, 'min')}
          isDragging={isDragging === 'min'}
        />
        <Thumb
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={e => handleMouseDown(e, 'max')}
          onTouchStart={e => handleTouchStart(e, 'max')}
          isDragging={isDragging === 'max'}
        />
      </SliderContainer>
      <Values>
        <Value>
          {min}
          {unit}
        </Value>
        <Value>
          {max}
          {unit}
        </Value>
      </Values>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

const Label = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.tertiary};
  font-weight: 500;
`

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.quaternary};
  border-radius: 2px;
`

const Range = styled.div<{ min: number; max: number }>`
  position: absolute;
  height: 100%;
  left: ${({ min }) => min}%;
  right: ${({ max }) => 100 - max}%;
  background: ${({ theme }) =>
    isDarkMode(theme) ? theme.secondary : theme.primary};
  border-radius: 2px;
  transition: all 0.1s ease;
`

const Thumb = styled.div<{ isDragging: boolean }>`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.white};
  border: 2px solid
    ${({ theme }) => (isDarkMode(theme) ? theme.secondary : theme.primary)};
  border-radius: 50%;
  cursor: pointer;
  transform: translateX(-50%);
  transition: all 0.1s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  ${({ isDragging }) =>
    isDragging &&
    `
    transform: translateX(-50%) scale(1.2);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  `}
`

const Values = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.tertiary};
`

const Value = styled.span`
  font-weight: 500;
`

export default RangeSlider
