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
import './registerFilters'
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
              <DynamicFilter
                type="name"
                value={filters.name}
                onChange={(value: string) => onUpdateFilter('name', value)}
                placeholder="Digite o nome do jogo..."
              />
            </FilterSection>

            {/* Gêneros */}
            {availableGenres.length > 0 && (
              <FilterSection title="Gêneros">
                <DynamicFilter
                  type="genres"
                  value={filters.genres}
                  onChange={(value: any) => onUpdateFilter('genres', value)}
                  options={availableGenres}
                  placeholder="Selecione os gêneros..."
                />
              </FilterSection>
            )}

            {/* Plataformas */}
            {availablePlatforms.length > 0 && (
              <FilterSection title="Plataformas">
                <DynamicFilter
                  type="platforms"
                  value={filters.platforms}
                  onChange={(value: any) => onUpdateFilter('platforms', value)}
                  options={availablePlatforms}
                  placeholder="Selecione as plataformas..."
                />
              </FilterSection>
            )}

            {/* Lojas */}
            {availableStores.length > 0 && (
              <FilterSection title="Lojas">
                <DynamicFilter
                  type="stores"
                  value={filters.stores}
                  onChange={(value: any) => onUpdateFilter('stores', value)}
                  options={availableStores}
                  placeholder="Selecione as lojas..."
                />
              </FilterSection>
            )}

            {/* Tags */}
            {availableTags.length > 0 && (
              <FilterSection title="Tags">
                <DynamicFilter
                  type="tags"
                  value={filters.tags}
                  onChange={(value: any) => onUpdateFilter('tags', value)}
                  options={availableTags}
                  placeholder="Selecione as tags..."
                />
              </FilterSection>
            )}

            {/* Data de Lançamento */}
            <FilterSection title="Data de Lançamento">
              <DynamicFilter
                type="dateRange"
                value={filters.dateRange}
                onChange={(value: any) => onUpdateFilter('dateRange', value)}
              />
            </FilterSection>

            {/* Metacritic Score */}
            <FilterSection title="Score Metacritic (0-100)">
              <DynamicFilter
                type="metacriticRange"
                value={filters.metacriticRange}
                onChange={(value: any) =>
                  onUpdateFilter('metacriticRange', value)
                }
                minValue={0}
                maxValue={100}
                step={1}
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
