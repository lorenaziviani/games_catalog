import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(className: string): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveValue(value: string | number | string[]): R
      toHaveTextContent(text: string | RegExp): R
      toBeDisabled(): R
      toBeEnabled(): R
      toBeVisible(): R
      toBeHidden(): R
      toHaveFocus(): R
      toHaveStyle(css: string | Record<string, any>): R
      toHaveDisplayValue(value: string | string[]): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toBePartiallyChecked(): R
      toBeChecked(): R
      toBeEmpty(): R
      toBeEmptyDOMElement(): R
      toHaveDescription(text?: string | RegExp): R
      toHaveErrorMessage(text?: string | RegExp): R
      toHaveAccessibleDescription(text?: string | RegExp): R
      toHaveAccessibleName(text?: string | RegExp): R
      toHaveAccessibleErrorMessage(text?: string | RegExp): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(className: string): R
      toHaveStyle(css: string | Record<string, any>): R
      toHaveValue(value: string | number | string[]): R
      toHaveDisplayValue(value: string | string[]): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toBePartiallyChecked(): R
      toBeChecked(): R
      toBeEmpty(): R
      toBeEmptyDOMElement(): R
      toHaveDescription(text?: string | RegExp): R
      toHaveErrorMessage(text?: string | RegExp): R
      toHaveAccessibleDescription(text?: string | RegExp): R
      toHaveAccessibleName(text?: string | RegExp): R
      toHaveAccessibleErrorMessage(text?: string | RegExp): R
    }
  }
}

export {}
