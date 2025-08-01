import { ElementType, TextVariant } from '@/types/common'
import type { FilterState, FilterType } from '@/types/filter'
import Text from '@components/common/ui/Text'
import { isDarkMode } from '@utils/themeUtils'
import { useCallback, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useTheme } from 'styled-components'
import DynamicFilter from './DynamicFilter'
import FilterSection from './FilterSection'
// Importação do registro de filtros movida para evitar problemas de carregamento
import './registerFilters'
import * as S from './styles'

interface FiltersProps {
  filters: FilterState
  onUpdateFilter: (
    type: FilterType,
    value:
      | string
      | number
      | string[]
      | { start: string; end: string }
      | { min: number; max: number }
  ) => void
  onResetFilters: () => void
  hasActiveFilters: boolean
  activeFiltersCount: number
  availableGenres: Array<{ value: string; label: string }>
  availablePlatforms: Array<{ value: string; label: string }>
  availableStores: Array<{ value: string; label: string }>
  availableTags: Array<{ value: string; label: string }>
}

interface FilterSectionConfig {
  title: string
  type: FilterType
  value:
    | string
    | number
    | string[]
    | { start: string; end: string }
    | { min: number; max: number }
  options?: Array<{ value: string; label: string }>
  placeholder?: string
  minValue?: number
  maxValue?: number
  step?: number
  unit?: string
}

const Filters = ({
  filters,
  onUpdateFilter,
  onResetFilters,
  hasActiveFilters,
  activeFiltersCount,
  availableGenres,
  availablePlatforms,
  availableStores,
  availableTags
}: FiltersProps) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  const handleResetFilters = useCallback(() => {
    onResetFilters()
  }, [onResetFilters])

  const renderFiltersHeader = () => (
    <S.FiltersHeader>
      <S.FiltersTitle>
        <Text
          as={ElementType.SPAN}
          $variant={
            isDarkMode(theme) ? TextVariant.SECONDARY : TextVariant.PRIMARY
          }
          $lgFontSize={20}
        >
          Filtros
        </Text>
        {hasActiveFilters && (
          <S.ActiveFiltersBadge>
            <Text as={ElementType.SPAN} $variant={TextVariant.WHITE}>
              {activeFiltersCount.toString()}
            </Text>
          </S.ActiveFiltersBadge>
        )}
      </S.FiltersTitle>
      <S.FiltersActions>
        {hasActiveFilters && (
          <S.ResetButton onClick={handleResetFilters}>
            <FiRefreshCw />
          </S.ResetButton>
        )}
        <S.ExpandButton onClick={handleToggleExpanded}>
          {isExpanded ? (
            <IoIosArrowUp size={16} />
          ) : (
            <IoIosArrowDown size={16} />
          )}
        </S.ExpandButton>
      </S.FiltersActions>
    </S.FiltersHeader>
  )

  const createFilterSection = (config: FilterSectionConfig) => (
    <FilterSection title={config.title}>
      <DynamicFilter
        type={config.type}
        value={config.value}
        onChange={(
          value:
            | string
            | number
            | string[]
            | { start: string; end: string }
            | { min: number; max: number }
        ) => onUpdateFilter(config.type, value)}
        options={config.options}
        placeholder={config.placeholder}
        minValue={config.minValue}
        maxValue={config.maxValue}
        step={config.step}
        unit={config.unit}
      />
    </FilterSection>
  )

  const renderFilterSections = () => {
    const filterConfigs: FilterSectionConfig[] = [
      {
        title: 'Nome do Jogo',
        type: 'name',
        value: filters.name,
        placeholder: 'Digite o nome do jogo...'
      },
      {
        title: 'Data de Lançamento',
        type: 'dateRange',
        value: filters.dateRange
      },
      {
        title: 'Gêneros',
        type: 'genres',
        value: filters.genres,
        options: availableGenres,
        placeholder: 'Selecione os gêneros...'
      }
    ]

    const conditionalFilters: FilterSectionConfig[] = [
      {
        title: 'Plataformas',
        type: 'platforms',
        value: filters.platforms,
        options: availablePlatforms,
        placeholder: 'Selecione as plataformas...'
      },
      {
        title: 'Lojas',
        type: 'stores',
        value: filters.stores,
        options: availableStores,
        placeholder: 'Selecione as lojas...'
      },
      {
        title: 'Tags',
        type: 'tags',
        value: filters.tags,
        options: availableTags,
        placeholder: 'Selecione as tags...'
      },
      {
        title: 'Score Metacritic (0-100)',
        type: 'metacriticRange',
        value: filters.metacriticRange,
        minValue: 0,
        maxValue: 100,
        step: 1,
        unit: ''
      }
    ]

    const availableOptions = [
      { config: conditionalFilters[0], data: availableGenres },
      { config: conditionalFilters[1], data: availablePlatforms },
      { config: conditionalFilters[2], data: availableStores },
      { config: conditionalFilters[3], data: availableTags }
    ]

    return (
      <S.FiltersGrid>
        {filterConfigs.map(config => (
          <div key={config.type}>{createFilterSection(config)}</div>
        ))}
        {availableOptions.map(({ config, data }) => (
          <div key={config.type}>
            {data.length > 0 && createFilterSection(config)}
          </div>
        ))}
      </S.FiltersGrid>
    )
  }

  const renderFiltersContent = () => {
    if (!isExpanded) return null

    return <S.FiltersContent>{renderFilterSections()}</S.FiltersContent>
  }

  return (
    <S.FiltersContainer data-testid="filters-section">
      {renderFiltersHeader()}
      {renderFiltersContent()}
    </S.FiltersContainer>
  )
}

export default Filters
