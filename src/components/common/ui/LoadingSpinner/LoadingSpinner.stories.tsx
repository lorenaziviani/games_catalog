import {
  LoadingMessage,
  LoadingSpinnerSize,
  LoadingSpinnerVariant
} from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { LightTheme } from '@styles/theme'
import { ThemeProvider } from 'styled-components'
import LoadingSpinner from './index'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de loading com diferentes tipos de animação e tamanhos'
      }
    }
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Mensagem exibida abaixo do spinner'
    },
    size: {
      control: 'select',
      options: [
        LoadingSpinnerSize.SMALL,
        LoadingSpinnerSize.MEDIUM,
        LoadingSpinnerSize.LARGE
      ],
      description: 'Tamanho do spinner'
    },
    variant: {
      control: 'select',
      options: [
        LoadingSpinnerVariant.DEFAULT,
        LoadingSpinnerVariant.DOTS,
        LoadingSpinnerVariant.GRADIENT
      ],
      description: 'Tipo de animação do spinner'
    }
  },
  decorators: [
    Story => (
      <ThemeProvider theme={LightTheme}>
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: LoadingMessage.GAMES,
    size: LoadingSpinnerSize.MEDIUM,
    variant: LoadingSpinnerVariant.DEFAULT
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner padrão com animação circular dupla'
      }
    }
  }
}

export const Dots: Story = {
  args: {
    message: LoadingMessage.DEFAULT,
    size: LoadingSpinnerSize.MEDIUM,
    variant: LoadingSpinnerVariant.DOTS
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner com animação de pontos pulsantes'
      }
    }
  }
}

export const Gradient: Story = {
  args: {
    message: LoadingMessage.DATA,
    size: LoadingSpinnerSize.MEDIUM,
    variant: LoadingSpinnerVariant.GRADIENT
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner com gradiente colorido rotativo'
      }
    }
  }
}

export const Small: Story = {
  args: {
    message: LoadingMessage.DEFAULT,
    size: LoadingSpinnerSize.SMALL,
    variant: LoadingSpinnerVariant.DEFAULT
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner pequeno para espaços reduzidos'
      }
    }
  }
}

export const Large: Story = {
  args: {
    message: LoadingMessage.GAMES,
    size: LoadingSpinnerSize.LARGE,
    variant: LoadingSpinnerVariant.DEFAULT
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner grande para destaque visual'
      }
    }
  }
}

export const SmallDots: Story = {
  args: {
    message: LoadingMessage.DEFAULT,
    size: LoadingSpinnerSize.SMALL,
    variant: LoadingSpinnerVariant.DOTS
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner de pontos pequeno'
      }
    }
  }
}

export const LargeGradient: Story = {
  args: {
    message: LoadingMessage.DATA,
    size: LoadingSpinnerSize.LARGE,
    variant: LoadingSpinnerVariant.GRADIENT
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner gradiente grande para carregamentos importantes'
      }
    }
  }
}

export const WithoutMessage: Story = {
  args: {
    message: '',
    size: LoadingSpinnerSize.MEDIUM,
    variant: LoadingSpinnerVariant.DEFAULT
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner sem mensagem, apenas animação'
      }
    }
  }
}

export const CustomMessage: Story = {
  args: {
    message: LoadingMessage.API,
    size: LoadingSpinnerSize.MEDIUM,
    variant: LoadingSpinnerVariant.DEFAULT
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner com mensagem customizada'
      }
    }
  }
}

export const LongMessage: Story = {
  args: {
    message:
      'Carregando lista de jogos populares da RAWG API, aguarde um momento...',
    size: LoadingSpinnerSize.MEDIUM,
    variant: LoadingSpinnerVariant.DEFAULT
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner com mensagem longa e descritiva'
      }
    }
  }
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Default Spinner</h3>
        <LoadingSpinner
          message={LoadingMessage.DEFAULT}
          variant={LoadingSpinnerVariant.DEFAULT}
        />
      </div>
      <div>
        <h3>Dots Spinner</h3>
        <LoadingSpinner
          message={LoadingMessage.DEFAULT}
          variant={LoadingSpinnerVariant.DOTS}
        />
      </div>
      <div>
        <h3>Gradient Spinner</h3>
        <LoadingSpinner
          message={LoadingMessage.DEFAULT}
          variant={LoadingSpinnerVariant.GRADIENT}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todos os tipos de spinner disponíveis'
      }
    }
  }
}
