export type FontSize = 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40

export type FontSizeType = {
  $lgFontSize?: FontSize
  $mdFontSize?: FontSize
  $smFontSize?: FontSize
}

export const fontSizeToRem = (size: FontSize): string => {
  const remMap: Record<FontSize, string> = {
    4: '0.25rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    32: '2rem',
    40: '2.5rem'
  }
  return remMap[size]
}
