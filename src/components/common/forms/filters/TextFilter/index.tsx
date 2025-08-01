import { useCallback, useEffect, useState } from 'react'
import * as S from './styles'

interface TextFilterProps {
  value:
    | string
    | number
    | string[]
    | { start: string; end: string }
    | { min: number; max: number }
  onChange: (value: string) => void
  placeholder?: string
}

const TextFilter = ({ value, onChange, placeholder }: TextFilterProps) => {
  const [inputValue, setInputValue] = useState(
    typeof value === 'string' ? value : ''
  )

  // Atualiza o inputValue quando o value externo muda
  useEffect(() => {
    if (typeof value === 'string') {
      setInputValue(value)
    }
  }, [value])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      onChange(newValue)
    },
    [onChange]
  )

  return (
    <S.Input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      data-testid="text-filter-input"
    />
  )
}

export default TextFilter
