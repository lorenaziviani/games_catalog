import { ElementType, TextVariant } from '@/types/common'
import type { FilterState, FilterType } from '@/types/filter'
import { useCallback, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useTheme } from 'styled-components'
import { isDarkMode } from '../../utils/themeUtils'
import Text from '../Text'
import DateRangeFilter from './DateRangeFilter'
import FilterSection from './FilterSection'
import MultiSelectFilter from './MultiSelectFilter'
import RangeSlider from './RangeSlider'
import TextFilter from './TextFilter'
import * as S from './styles'

interface FiltersProps {
  filters: FilterState
  onUpdateFilter: (type: FilterType, value: any) => void
  onResetFilters: () => void
  hasActiveFilters: boolean
  activeFiltersCount: number
  availableGenres: Array<{ value: string; label: string }>
  availablePlatforms: Array<{ value: string; label: string }>
  availableStores: Array<{ value: string; label: string }>
  availableTags: Array<{ value: string; label: string }>
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

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleResetFilters = useCallback(() => {
    onResetFilters()
  }, [onResetFilters])

  return (
    <S.FiltersContainer>
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

      {isExpanded && (
        <S.FiltersContent>
          <S.FiltersGrid>
            {/* Busca por Nome */}
            <FilterSection title="Nome do Jogo">
              <TextFilter
                value={filters.name}
                onChange={(value: string) => onUpdateFilter('name', value)}
                placeholder="Digite o nome do jogo..."
              />
            </FilterSection>

            {/* Gêneros */}
            {availableGenres.length > 0 && (
              <FilterSection title="Gêneros">
                <MultiSelectFilter
                  options={availableGenres}
                  selectedValues={filters.genres}
                  onChange={value => onUpdateFilter('genres', value)}
                  placeholder="Selecione os gêneros..."
                />
              </FilterSection>
            )}

            {/* Plataformas */}
            {availablePlatforms.length > 0 && (
              <FilterSection title="Plataformas">
                <MultiSelectFilter
                  options={availablePlatforms}
                  selectedValues={filters.platforms}
                  onChange={value => onUpdateFilter('platforms', value)}
                  placeholder="Selecione as plataformas..."
                />
              </FilterSection>
            )}

            {/* Lojas */}
            {availableStores.length > 0 && (
              <FilterSection title="Lojas">
                <MultiSelectFilter
                  options={availableStores}
                  selectedValues={filters.stores}
                  onChange={value => onUpdateFilter('stores', value)}
                  placeholder="Selecione as lojas..."
                />
              </FilterSection>
            )}

            {/* Tags */}
            {availableTags.length > 0 && (
              <FilterSection title="Tags">
                <MultiSelectFilter
                  options={availableTags}
                  selectedValues={filters.tags}
                  onChange={value => onUpdateFilter('tags', value)}
                  placeholder="Selecione as tags..."
                />
              </FilterSection>
            )}

            {/* Data de Lançamento */}
            <FilterSection title="Data de Lançamento">
              <DateRangeFilter
                startDate={filters.dateRange.start}
                endDate={filters.dateRange.end}
                onChange={(start, end) =>
                  onUpdateFilter('dateRange', { start, end })
                }
              />
            </FilterSection>

            {/* Metacritic Score */}
            <FilterSection title="Score Metacritic (0-100)">
              <RangeSlider
                min={filters.metacriticRange.min}
                max={filters.metacriticRange.max}
                minValue={0}
                maxValue={100}
                step={1}
                onChange={(min, max) =>
                  onUpdateFilter('metacriticRange', { min, max })
                }
                label="Selecione a faixa de score"
                unit=""
              />
            </FilterSection>
          </S.FiltersGrid>
        </S.FiltersContent>
      )}
    </S.FiltersContainer>
  )
}

export default Filters
