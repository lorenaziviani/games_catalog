import { useCallback, useState } from 'react'
import * as S from './styles'

interface TextFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const TextFilter = ({ value, onChange, placeholder }: TextFilterProps) => {
  const [inputValue, setInputValue] = useState(value)

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
