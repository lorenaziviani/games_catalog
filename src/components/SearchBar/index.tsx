import * as S from './styles'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxWidth?: string
}

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  maxWidth = '400px'
}: SearchBarProps) => {
  return (
    <S.SearchContainer $maxWidth={maxWidth}>
      <S.SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <S.SearchIcon />
    </S.SearchContainer>
  )
}

export default SearchBar
