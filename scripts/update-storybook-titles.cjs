const fs = require('fs')
const path = require('path')

const pathMappings = {
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

function getStoryTitle(filePath) {
  const cleanPath = filePath
    .replace(/^.*\/src\/components\//, '')
    .replace(/\.stories\.(ts|tsx|js|jsx)$/, '')

  return pathMappings[cleanPath] || `Components/${cleanPath}`
}

function updateStoryTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const expectedTitle = getStoryTitle(filePath)

    const titleRegex = /title:\s*['"`]([^'"`]+)['"`],/
    const match = content.match(titleRegex)

    if (match && match[1] !== expectedTitle) {
      const newContent = content.replace(
        titleRegex,
        `title: '${expectedTitle}',`
      )
      fs.writeFileSync(filePath, newContent, 'utf8')
      console.log(
        `Updated: ${path.relative(process.cwd(), filePath)} -> ${expectedTitle}`
      )
      return true
    } else if (!match) {
      console.log(` No title found: ${path.relative(process.cwd(), filePath)}`)
    } else {
      console.log(
        `Already correct: ${path.relative(process.cwd(), filePath)} -> ${expectedTitle}`
      )
    }
    return false
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message)
    return false
  }
}

function findStoryFiles(dir) {
  const files = []

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir)

    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        traverse(fullPath)
      } else if (
        item.endsWith('.stories.tsx') ||
        item.endsWith('.stories.ts')
      ) {
        files.push(fullPath)
      }
    }
  }

  traverse(dir)
  return files
}

function main() {
  const componentsDir = path.join(__dirname, '../src/components')

  if (!fs.existsSync(componentsDir)) {
    console.error('Components directory not found')
    process.exit(1)
  }

  console.log('Finding story files...')
  const storyFiles = findStoryFiles(componentsDir)

  console.log(`Found ${storyFiles.length} story files`)
  console.log('\nUpdating story titles...\n')

  let updatedCount = 0

  for (const file of storyFiles) {
    if (updateStoryTitle(file)) {
      updatedCount++
    }
  }

  console.log(`\nDone! Updated ${updatedCount} files`)

  if (updatedCount > 0) {
    console.log('\nSummary of changes:')
    console.log('- Common/UI: UI components like buttons, text, images')
    console.log('- Common/Layout: Layout components like header, banner')
    console.log('- Common/Forms: Form components and filters')
    console.log('- Game: Game-specific components like cards, modals')
    console.log(
      '- Features: Feature-specific components like favorites, navigation'
    )
  }
}

if (require.main === module) {
  main()
}

module.exports = { getStoryTitle, updateStoryTitle }
