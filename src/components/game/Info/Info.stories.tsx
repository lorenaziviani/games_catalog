import type { Meta, StoryObj } from '@storybook/react-vite'
import Info from './index'

const meta: Meta<typeof Info> = {
  title: 'Game/Info',
  component: Info,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente que exibe informações de data de lançamento e tempo de jogo'
      }
    }
  },
  argTypes: {
    released: {
      control: 'text',
      description: 'Data de lançamento do jogo (formato ISO)'
    },
    playtime: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'Tempo de jogo em horas'
    },
    showPlaytime: {
      control: 'boolean',
      description: 'Se deve exibir o tempo de jogo'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    released: '2015-05-19',
    playtime: 120,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Informações padrão com data e tempo de jogo'
      }
    }
  }
}

export const RecentGame: Story = {
  args: {
    released: '2023-12-14',
    playtime: 45,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Jogo recente com pouco tempo de jogo'
      }
    }
  }
}

export const OldGame: Story = {
  args: {
    released: '1998-11-23',
    playtime: 300,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Jogo antigo com muito tempo de jogo'
      }
    }
  }
}

export const WithoutPlaytime: Story = {
  args: {
    released: '2022-03-15',
    playtime: 80,
    showPlaytime: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Exibe apenas a data de lançamento'
      }
    }
  }
}

export const ShortPlaytime: Story = {
  args: {
    released: '2023-06-10',
    playtime: 5,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Jogo com pouco tempo de jogo'
      }
    }
  }
}

export const LongPlaytime: Story = {
  args: {
    released: '2020-01-20',
    playtime: 500,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Jogo com muito tempo de jogo'
      }
    }
  }
}

export const ZeroPlaytime: Story = {
  args: {
    released: '2023-11-30',
    playtime: 0,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Jogo sem tempo de jogo registrado'
      }
    }
  }
}

export const FutureRelease: Story = {
  args: {
    released: '2024-12-25',
    playtime: 0,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Jogo com data de lançamento futura'
      }
    }
  }
}

export const DifferentDateFormats: Story = {
  args: {
    released: '2018-10-26',
    playtime: 150,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Diferentes formatos de data são formatados corretamente'
      }
    }
  }
}

export const HighPlaytime: Story = {
  args: {
    released: '2017-03-07',
    playtime: 1000,
    showPlaytime: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Jogo com tempo de jogo muito alto'
      }
    }
  }
}
