import { isDarkMode } from '@utils/themeUtils'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useTheme } from 'styled-components'
import * as S from './styles'

interface FilterOption {
  value: string
  label: string
}

interface MultiSelectFilterProps {
  options: FilterOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  onToggle?: () => void
  isSingleSelect?: boolean
  showActionButtons?: boolean
}

const MultiSelectFilter = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Selecione...',
  onToggle,
  isSingleSelect = false
}: MultiSelectFilterProps) => {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggleOption = (value: string) => {
    let newValues: string[]

    if (isSingleSelect) {
      newValues = selectedValues.includes(value) ? [] : [value]
    } else {
      newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
    }

    onChange(newValues)
  }

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
    onToggle?.()
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedLabels = options
    .filter(option => selectedValues.includes(option.value))
    .map(option => option.label)
    .join(', ')

  return (
    <S.Container
      ref={dropdownRef}
      data-testid="multi-select-filter"
      data-options-count={options.length}
      data-selected-count={selectedValues.length}
      data-placeholder={placeholder}
    >
      <S.SelectButton
        onClick={handleToggleDropdown}
        $isOpen={isOpen}
        $isDarkMode={isDarkMode(theme)}
      >
        <S.SelectText>
          {selectedValues.length > 0 ? selectedLabels : placeholder}
        </S.SelectText>
        <S.ArrowIcon $isOpen={isOpen}>
          <IoIosArrowDown size={16} />
        </S.ArrowIcon>
      </S.SelectButton>

      {isOpen && (
        <S.Dropdown $isDarkMode={isDarkMode(theme)}>
          {options.map(option => {
            const isSelected = selectedValues.includes(option.value)
            return (
              <S.Option
                key={option.value}
                onClick={() => handleToggleOption(option.value)}
                $isSelected={isSelected}
                $isDarkMode={isDarkMode(theme)}
              >
                {!isSingleSelect && (
                  <S.Checkbox $isSelected={isSelected}>
                    {isSelected && <S.Checkmark>✓</S.Checkmark>}
                  </S.Checkbox>
                )}
                <S.OptionText>{option.label}</S.OptionText>
              </S.Option>
            )
          })}
        </S.Dropdown>
      )}
    </S.Container>
  )
}

export default MultiSelectFilter
