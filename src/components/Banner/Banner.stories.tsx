import { ElementType, TextVariant } from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BiSolidJoystick } from 'react-icons/bi'
import { FaHeart } from 'react-icons/fa'
import Text from '../Text'
import Banner from './index'

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Componente Banner reutilizável para exibir seções hero com conteúdo personalizado e badge opcional'
      }
    }
  },
  argTypes: {
    children: {
      control: false,
      description: 'Conteúdo do banner (ReactNode)'
    },
    badge: {
      control: 'object',
      description: 'Configuração opcional do badge (icon e text)'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

const DefaultContent = () => (
  <>
    <Text
      as={ElementType.TITLE}
      $variant={TextVariant.PRIMARY}
      $lgFontSize={40}
    >
      Descubra Seus Jogos Favoritos
    </Text>
    <Text as={ElementType.P} $variant={TextVariant.TERTIARY} $lgFontSize={20}>
      Explore milhares de títulos, veja detalhes, avaliações e salve seus
      favoritos em um só lugar.
    </Text>
  </>
)

const FavoritesContent = () => (
  <>
    <Text
      as={ElementType.TITLE}
      $variant={TextVariant.PRIMARY}
      $lgFontSize={40}
    >
      Sua Biblioteca de Jogos
    </Text>
    <Text as={ElementType.P} $variant={TextVariant.TERTIARY} $lgFontSize={20}>
      Gerencie seus jogos favoritos, organize por gênero e descubra novos
      títulos baseados no que você ama.
    </Text>
  </>
)

export const Default: Story = {
  render: () => <Banner>{DefaultContent()}</Banner>,
  parameters: {
    docs: {
      description: {
        story: 'Banner padrão sem badge'
      }
    }
  }
}

export const WithBadge: Story = {
  render: () => (
    <Banner
      badge={{
        icon: BiSolidJoystick,
        text: 'Catálogo Completo'
      }}
    >
      {DefaultContent()}
    </Banner>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Banner com badge personalizado'
      }
    }
  }
}

export const FavoritesBanner: Story = {
  render: () => (
    <Banner
      badge={{
        icon: FaHeart,
        text: 'Meus Favoritos'
      }}
    >
      {FavoritesContent()}
    </Banner>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Banner para página de favoritos com badge personalizado'
      }
    }
  }
}
