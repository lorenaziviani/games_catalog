import type { Meta, StoryObj } from '@storybook/react-vite'
import Image from './index'

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de imagem com loading, fallback e tratamento de erro'
      }
    }
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL da imagem'
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo da imagem'
    },
    fallbackSrc: {
      control: 'text',
      description: 'URL da imagem de fallback'
    },
    className: {
      control: 'text',
      description: 'Classe CSS adicional'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://placehold.co/600x400/2563eb/ffffff?text=Game+Image',
    alt: 'Imagem do jogo',
    fallbackSrc: '/placeholder-game.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Imagem carregada com sucesso'
      }
    }
  }
}

export const Loading: Story = {
  args: {
    src: 'https://httpbin.org/delay/3',
    alt: 'Imagem carregando',
    fallbackSrc: '/placeholder-game.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado de carregamento da imagem'
      }
    }
  }
}

export const Error: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'Imagem com erro',
    fallbackSrc: '/placeholder-game.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Imagem com erro - mostra fallback e placeholder'
      }
    }
  }
}

export const ErrorWithInvalidFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'Imagem com erro e fallback inválido',
    fallbackSrc: 'https://another-invalid-url.com/fallback.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Erro na imagem principal e no fallback - mostra placeholder'
      }
    }
  }
}

export const CustomFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'Imagem com fallback customizado',
    fallbackSrc:
      'https://placehold.co/600x400/ef4444/ffffff?text=Fallback+Image'
  },
  parameters: {
    docs: {
      description: {
        story: 'Imagem com erro usando fallback customizado'
      }
    }
  }
}

export const GameImage: Story = {
  args: {
    src: 'https://placehold.co/600x400/10b981/ffffff?text=The+Witcher+3',
    alt: 'The Witcher 3: Wild Hunt',
    fallbackSrc: '/placeholder-game.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de imagem de jogo'
      }
    }
  }
}

export const WithCustomClass: Story = {
  args: {
    src: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Custom+Class',
    alt: 'Imagem com classe customizada',
    fallbackSrc: '/placeholder-game.jpg',
    className: 'custom-image-class'
  },
  parameters: {
    docs: {
      description: {
        story: 'Imagem com classe CSS customizada'
      }
    }
  }
}

export const SlowLoading: Story = {
  args: {
    src: 'https://httpbin.org/delay/5',
    alt: 'Imagem com carregamento lento',
    fallbackSrc: '/placeholder-game.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Imagem com carregamento lento para testar o spinner'
      }
    }
  }
}

export const MultipleErrors: Story = {
  args: {
    src: 'https://invalid-url-1.com/image.jpg',
    alt: 'Múltiplos erros de imagem',
    fallbackSrc: 'https://invalid-url-2.com/fallback.jpg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Teste de múltiplos erros - imagem principal e fallback falham'
      }
    }
  }
}
