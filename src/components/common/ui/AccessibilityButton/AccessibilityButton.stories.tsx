import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { store } from '../../../../store'
import { LightTheme } from '../../../../styles/theme'
import AccessibilityButton from './index'

const meta: Meta<typeof AccessibilityButton> = {
  title: 'Common/UI/AccessibilityButton',
  component: AccessibilityButton,
  decorators: [
    Story => (
      <Provider store={store}>
        <ThemeProvider theme={LightTheme}>
          <Story />
        </ThemeProvider>
      </Provider>
    )
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botão de configurações de acessibilidade com menu dropdown para modos de cor, tamanho de fonte e redução de movimento.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    setTheme: {
      description: 'Função para alterar o tema da aplicação',
      control: false
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    setTheme: () => {}
  }
}

export const WithMenuOpen: Story = {
  args: {
    setTheme: () => {}
  },
  parameters: {
    docs: {
      description: {
        story:
          'Estado do botão com menu aberto mostrando todas as opções de acessibilidade.'
      }
    }
  }
}

export const ColorblindMode: Story = {
  args: {
    setTheme: () => {}
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão com modo daltonismo ativo, mostrando preview das cores adaptadas.'
      }
    }
  }
}

export const HighContrastMode: Story = {
  args: {
    setTheme: () => {}
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão com modo alto contraste ativo para melhor visibilidade.'
      }
    }
  }
}

export const LargeTextMode: Story = {
  args: {
    setTheme: () => {}
  },
  parameters: {
    docs: {
      description: {
        story: 'Botão com texto grande ativo para melhor legibilidade.'
      }
    }
  }
}

export const ReducedMotionMode: Story = {
  args: {
    setTheme: () => {}
  },
  parameters: {
    docs: {
      description: {
        story:
          'Botão com redução de movimento ativa para usuários sensíveis a animações.'
      }
    }
  }
}
