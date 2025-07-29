import { MetacriticScoreSize } from '@/types/common'
import type { Meta, StoryObj } from '@storybook/react-vite'
import MetacriticScore from './index'

const meta: Meta<typeof MetacriticScore> = {
  title: 'Components/MetacriticScore',
  component: MetacriticScore,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de score do Metacritic com cores baseadas no tema'
      }
    }
  },
  argTypes: {
    score: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Score do Metacritic (0-100)'
    },
    showLabel: {
      control: 'boolean',
      description: 'Mostrar label "Metacritic:"'
    },
    size: {
      control: { type: 'select' },
      options: [
        MetacriticScoreSize.SMALL,
        MetacriticScoreSize.MEDIUM,
        MetacriticScoreSize.LARGE
      ],
      description: 'Tamanho do componente'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    score: 85,
    showLabel: true,
    size: MetacriticScoreSize.MEDIUM
  }
}

export const Excellent: Story = {
  args: {
    score: 95,
    showLabel: true,
    size: MetacriticScoreSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Score excelente (90+) - cor verde'
      }
    }
  }
}

export const Good: Story = {
  args: {
    score: 85,
    showLabel: true,
    size: MetacriticScoreSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Score bom (80-89) - cor verde claro'
      }
    }
  }
}

export const Average: Story = {
  args: {
    score: 75,
    showLabel: true,
    size: MetacriticScoreSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Score médio (70-79) - cor amarela'
      }
    }
  }
}

export const Poor: Story = {
  args: {
    score: 65,
    showLabel: true,
    size: MetacriticScoreSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Score ruim (60-69) - cor laranja'
      }
    }
  }
}

export const Bad: Story = {
  args: {
    score: 45,
    showLabel: true,
    size: MetacriticScoreSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Score ruim (<60) - cor vermelha'
      }
    }
  }
}

export const WithoutLabel: Story = {
  args: {
    score: 85,
    showLabel: false,
    size: MetacriticScoreSize.MEDIUM
  },
  parameters: {
    docs: {
      description: {
        story: 'Score sem label "Metacritic:"'
      }
    }
  }
}

export const Small: Story = {
  args: {
    score: 85,
    showLabel: true,
    size: MetacriticScoreSize.SMALL
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamanho pequeno'
      }
    }
  }
}

export const Large: Story = {
  args: {
    score: 85,
    showLabel: true,
    size: MetacriticScoreSize.LARGE
  },
  parameters: {
    docs: {
      description: {
        story: 'Tamanho grande'
      }
    }
  }
}

export const AllScores: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <MetacriticScore score={95} showLabel={true} />
      <MetacriticScore score={85} showLabel={true} />
      <MetacriticScore score={75} showLabel={true} />
      <MetacriticScore score={65} showLabel={true} />
      <MetacriticScore score={45} showLabel={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todos os scores e suas cores'
      }
    }
  }
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <MetacriticScore score={85} size={MetacriticScoreSize.SMALL} />
      <MetacriticScore score={85} size={MetacriticScoreSize.MEDIUM} />
      <MetacriticScore score={85} size={MetacriticScoreSize.LARGE} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparação de todos os tamanhos disponíveis'
      }
    }
  }
}

export const ExtremeScores: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <MetacriticScore score={100} showLabel={true} />
      <MetacriticScore score={50} showLabel={true} />
      <MetacriticScore score={0} showLabel={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Scores extremos (100, 50, 0)'
      }
    }
  }
}
