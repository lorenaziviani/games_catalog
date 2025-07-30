import { ElementType, TextVariant } from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Text from './index'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de texto reutilizável com diferentes variantes e tamanhos responsivos'
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteúdo do texto'
    },
    as: {
      control: { type: 'select' },
      options: [ElementType.P, ElementType.SPAN, ElementType.TITLE],
      description: 'Elemento HTML a ser renderizado'
    },
    $variant: {
      control: { type: 'select' },
      options: [TextVariant.PRIMARY, TextVariant.SECONDARY],
      description: 'Variante de cor do texto'
    },
    $lgFontSize: {
      control: { type: 'select' },
      options: [4, 8, 12, 16, 20, 24, 32, 40],
      description: 'Tamanho da fonte para desktop (lg)'
    },
    $mdFontSize: {
      control: { type: 'select' },
      options: [4, 8, 12, 16, 20, 24, 32, 40],
      description: 'Tamanho da fonte para tablet (md)'
    },
    $smFontSize: {
      control: { type: 'select' },
      options: [4, 8, 12, 16, 20, 24, 32, 40],
      description: 'Tamanho da fonte para mobile (sm)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Este é um texto padrão com tamanho 16px',
    as: ElementType.P,
    $variant: TextVariant.PRIMARY,
    $lgFontSize: 16
  }
}

export const Heading: Story = {
  args: {
    children: 'Este é um título principal',
    as: ElementType.TITLE,
    $variant: TextVariant.PRIMARY,
    $lgFontSize: 32,
    $mdFontSize: 24,
    $smFontSize: 20
  }
}

export const Responsive: Story = {
  args: {
    children: 'Este texto se adapta aos diferentes tamanhos de tela',
    as: ElementType.P,
    $variant: TextVariant.PRIMARY,
    $lgFontSize: 24,
    $mdFontSize: 20,
    $smFontSize: 16
  },
  parameters: {
    docs: {
      description: {
        story:
          'Exemplo de texto responsivo que muda de tamanho conforme o breakpoint'
      }
    }
  }
}

export const TitleAndParagraph: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text
        as={ElementType.TITLE}
        $lgFontSize={32}
        $mdFontSize={24}
        $smFontSize={20}
      >
        Título Principal
      </Text>
      <Text
        as={ElementType.P}
        $lgFontSize={16}
        $mdFontSize={12}
        $smFontSize={12}
      >
        Este é um parágrafo de texto normal com informações importantes sobre o
        conteúdo. O texto se adapta aos diferentes tamanhos de tela e mantém a
        legibilidade.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso com título e parágrafo em hierarquia'
      }
    }
  }
}
