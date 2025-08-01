import DateRangeFilterAdapter from './adapters/DateRangeFilterAdapter'
import MultiSelectFilterAdapter from './adapters/MultiSelectFilterAdapter'
import RangeSliderAdapter from './adapters/RangeSliderAdapter'
import { filterRegistry } from './FilterRegistry'
import TextFilter from './TextFilter'
import type { FilterRenderer } from './types'

const registerExistingFilters = () => {
  const filters: FilterRenderer[] = [
    {
      type: 'name',
      component: TextFilter
    },
    {
      type: 'genres',
      component: MultiSelectFilterAdapter
    },
    {
      type: 'platforms',
      component: MultiSelectFilterAdapter
    },
    {
      type: 'stores',
      component: MultiSelectFilterAdapter
    },
    {
      type: 'tags',
      component: MultiSelectFilterAdapter
    },
    {
      type: 'dateRange',
      component: DateRangeFilterAdapter
    },
    {
      type: 'metacriticRange',
      component: RangeSliderAdapter
    }
  ]

  filters.forEach(filter => {
    filterRegistry.registerFilter(filter)
  })
}

registerExistingFilters()

export { filterRegistry }
