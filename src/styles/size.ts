export type ComponentSize = 'small' | 'medium' | 'large'

export interface SizeTokens {
  width: string
  height: string
  padding: string
  fontSize: string
  borderRadius: string
  gap?: string
  minWidth?: string
  minHeight?: string
}

export const componentSizes: Record<ComponentSize, SizeTokens> = {
  small: {
    width: '2rem',
    height: '2rem',
    padding: '0.2rem 0.4rem',
    fontSize: '0.5rem',
    borderRadius: '0.1875rem',
    gap: '0.25rem',
    minWidth: '1.5rem',
    minHeight: '1.5rem'
  },
  medium: {
    width: '2.5rem',
    height: '2.5rem',
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    borderRadius: '0.25rem',
    gap: '0.5rem',
    minWidth: '2rem',
    minHeight: '2rem'
  },
  large: {
    width: '3rem',
    height: '3rem',
    padding: '0.4rem 0.8rem',
    fontSize: '1rem',
    borderRadius: '0.375rem',
    gap: '0.75rem',
    minWidth: '2.5rem',
    minHeight: '2.5rem'
  }
}

export const getSizeTokens = (size: ComponentSize): SizeTokens => {
  return componentSizes[size]
}

export const responsiveSizes: Record<
  ComponentSize,
  {
    tablet: Partial<SizeTokens>
    mobile: Partial<SizeTokens>
  }
> = {
  small: {
    tablet: {
      width: '1.75rem',
      height: '1.75rem',
      padding: '0.15rem 0.3rem',
      fontSize: '0.4rem',
      borderRadius: '0.125rem'
    },
    mobile: {
      width: '1.5rem',
      height: '1.5rem',
      padding: '0.1rem 0.25rem',
      fontSize: '0.25rem',
      borderRadius: '0.0625rem'
    }
  },
  medium: {
    tablet: {
      width: '2.25rem',
      height: '2.25rem',
      padding: '0.2rem 0.4rem',
      fontSize: '0.6rem',
      borderRadius: '0.1875rem'
    },
    mobile: {
      width: '2rem',
      height: '2rem',
      padding: '0.15rem 0.3rem',
      fontSize: '0.5rem',
      borderRadius: '0.125rem'
    }
  },
  large: {
    tablet: {
      width: '2.75rem',
      height: '2.75rem',
      padding: '0.35rem 0.7rem',
      fontSize: '0.8rem',
      borderRadius: '0.3125rem'
    },
    mobile: {
      width: '2.5rem',
      height: '2.5rem',
      padding: '0.3rem 0.6rem',
      fontSize: '0.7rem',
      borderRadius: '0.25rem'
    }
  }
}
