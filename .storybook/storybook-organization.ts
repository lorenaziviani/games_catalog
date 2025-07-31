export const getStoryTitle = (filePath: string): string => {
  const cleanPath = filePath
    .replace(/^.*\/src\/components\//, '')
    .replace(/\.stories\.(ts|tsx|js|jsx)$/, '')

  const pathMappings: Record<string, string> = {
    // Common Components
    'common/ui/AccessibilityButton': 'Common/UI/AccessibilityButton',
    'common/ui/Image': 'Common/UI/Image',
    'common/ui/LoadingSpinner': 'Common/UI/LoadingSpinner',
    'common/ui/Tag': 'Common/UI/Tag',
    'common/ui/TagsContainer': 'Common/UI/TagsContainer',
    'common/ui/Text': 'Common/UI/Text',

    // Common Layout
    'common/layout/Banner': 'Common/Layout/Banner',
    'common/layout/Header': 'Common/Layout/Header',

    // Common Forms
    'common/forms/Sort': 'Common/Forms/Sort',
    'common/forms/filters/Filters': 'Common/Forms/Filters/Filters',
    'common/forms/filters/DateRangeFilter':
      'Common/Forms/Filters/DateRangeFilter',
    'common/forms/filters/FilterSection': 'Common/Forms/Filters/FilterSection',
    'common/forms/filters/MultiSelectFilter':
      'Common/Forms/Filters/MultiSelectFilter',
    'common/forms/filters/RangeSlider': 'Common/Forms/Filters/RangeSlider',
    'common/forms/filters/TextFilter': 'Common/Forms/Filters/TextFilter',

    // Game Components
    'game/Card': 'Game/Card',
    'game/GridCard': 'Game/GridCard',
    'game/Info': 'Game/Info',
    'game/List': 'Game/List',
    'game/MetacriticScore': 'Game/MetacriticScore',
    'game/RatingBadge': 'Game/RatingBadge',
    'game/Stats': 'Game/Stats',
    'game/GameModal': 'Game/GameModal',

    // Features
    'features/favorites/FavoriteButton': 'Features/Favorites/FavoriteButton',
    'features/navigation/Pagination': 'Features/Navigation/Pagination',
    'features/theme/ThemeButton': 'Features/Theme/ThemeButton'
  }

  return pathMappings[cleanPath] || `Components/${cleanPath}`
}

export const generateStoryTitle = (filePath: string): string => {
  return getStoryTitle(filePath)
}
