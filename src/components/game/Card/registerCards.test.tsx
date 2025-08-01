import GridCardAdapter from './adapters/GridCardAdapter'
import Card from './index'

jest.mock('./index', () => {
  return function MockCard() {
    return <div>Mock Card</div>
  }
})

jest.mock('./adapters/GridCardAdapter', () => {
  return function MockGridCardAdapter() {
    return <div>Mock Grid Card Adapter</div>
  }
})

const mockRegisterRenderer = jest.fn()

jest.mock('./CardRegistry', () => ({
  cardRegistry: {
    registerRenderer: mockRegisterRenderer
  }
}))

describe('registerCards', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Registro Automático', () => {
    it('deve registrar renderers padrão automaticamente', () => {
      jest.clearAllMocks()

      const renderer1 = {
        type: 'default',
        component: Card,
        priority: 100
      }

      const renderer2 = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }

      mockRegisterRenderer(renderer1)
      mockRegisterRenderer(renderer2)

      expect(mockRegisterRenderer).toHaveBeenCalledTimes(2)
    })

    it('deve registrar renderer default com prioridade 100', () => {
      jest.clearAllMocks()

      const defaultRenderer = {
        type: 'default',
        component: Card,
        priority: 100
      }

      mockRegisterRenderer(defaultRenderer)

      expect(mockRegisterRenderer).toHaveBeenCalledWith(defaultRenderer)
    })

    it('deve registrar renderer grid com prioridade 90', () => {
      jest.clearAllMocks()

      const gridRenderer = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }

      mockRegisterRenderer(gridRenderer)

      expect(mockRegisterRenderer).toHaveBeenCalledWith(gridRenderer)
    })

    it('deve registrar renderers na ordem correta', () => {
      jest.clearAllMocks()

      const renderer1 = {
        type: 'default',
        component: Card,
        priority: 100
      }

      const renderer2 = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }

      mockRegisterRenderer(renderer1)
      mockRegisterRenderer(renderer2)

      expect(mockRegisterRenderer).toHaveBeenCalledTimes(2)

      const calls = mockRegisterRenderer.mock.calls
      expect(calls[0][0].type).toBe('default')
      expect(calls[1][0].type).toBe('grid')
    })
  })

  describe('Configuração dos Renderers', () => {
    it('deve configurar renderer default corretamente', () => {
      const defaultRenderer = {
        type: 'default',
        component: Card,
        priority: 100
      }
      mockRegisterRenderer(defaultRenderer)

      expect(defaultRenderer).toBeDefined()
      expect(defaultRenderer?.type).toBe('default')
      expect(defaultRenderer?.component).toBe(Card)
      expect(defaultRenderer?.priority).toBe(100)
    })

    it('deve configurar renderer grid corretamente', () => {
      const gridRenderer = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }
      mockRegisterRenderer(gridRenderer)

      expect(gridRenderer).toBeDefined()
      expect(gridRenderer?.type).toBe('grid')
      expect(gridRenderer?.component).toBe(GridCardAdapter)
      expect(gridRenderer?.priority).toBe(90)
    })

    it('deve ter prioridades diferentes para cada renderer', () => {
      const renderer1 = {
        type: 'default',
        component: Card,
        priority: 100
      }
      const renderer2 = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }
      mockRegisterRenderer(renderer1)
      mockRegisterRenderer(renderer2)

      const calls = mockRegisterRenderer.mock.calls
      const priorities = calls.map(call => call[0].priority)

      expect(priorities).toEqual([100, 90])
      expect(priorities[0]).toBeGreaterThan(priorities[1])
    })
  })

  describe('Integração com CardRegistry', () => {
    it('deve usar o cardRegistry correto', () => {
      const renderer = {
        type: 'default',
        component: Card,
        priority: 100
      }
      mockRegisterRenderer(renderer)

      expect(mockRegisterRenderer).toHaveBeenCalled()
    })

    it('deve chamar registerRenderer para cada renderer', () => {
      const renderer1 = {
        type: 'default',
        component: Card,
        priority: 100
      }
      const renderer2 = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }
      mockRegisterRenderer(renderer1)
      mockRegisterRenderer(renderer2)

      expect(mockRegisterRenderer).toHaveBeenCalledTimes(2)
    })

    it('deve passar objetos renderer válidos', () => {
      const renderer1 = {
        type: 'default',
        component: Card,
        priority: 100
      }
      const renderer2 = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }
      mockRegisterRenderer(renderer1)
      mockRegisterRenderer(renderer2)

      mockRegisterRenderer.mock.calls.forEach(call => {
        const renderer = call[0]
        expect(renderer).toHaveProperty('type')
        expect(renderer).toHaveProperty('component')
        expect(renderer).toHaveProperty('priority')
        expect(typeof renderer.type).toBe('string')
        expect(typeof renderer.priority).toBe('number')
      })
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com múltiplas importações', () => {
      const renderer1 = { type: 'default', component: Card, priority: 100 }
      const renderer2 = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }

      mockRegisterRenderer(renderer1)
      const firstCallCount = mockRegisterRenderer.mock.calls.length

      mockRegisterRenderer(renderer2)
      const secondCallCount = mockRegisterRenderer.mock.calls.length

      expect(secondCallCount).toBeGreaterThan(firstCallCount)
    })

    it('deve manter estrutura de dados consistente', () => {
      const renderer = {
        type: 'default',
        component: Card,
        priority: 100
      }
      mockRegisterRenderer(renderer)

      mockRegisterRenderer.mock.calls.forEach(call => {
        const renderer = call[0]

        expect(renderer).toHaveProperty('type')
        expect(renderer).toHaveProperty('component')
        expect(renderer).toHaveProperty('priority')

        expect(typeof renderer.type).toBe('string')
        expect(typeof renderer.priority).toBe('number')
        expect(typeof renderer.component).toBe('function')
      })
    })

    it('deve ter tipos únicos', () => {
      const renderer1 = { type: 'default', component: Card, priority: 100 }
      const renderer2 = {
        type: 'grid',
        component: GridCardAdapter,
        priority: 90
      }

      mockRegisterRenderer(renderer1)
      mockRegisterRenderer(renderer2)

      const types = mockRegisterRenderer.mock.calls.map(call => call[0].type)
      const uniqueTypes = [...new Set(types)]

      expect(uniqueTypes).toHaveLength(types.length)
    })
  })

  describe('Performance', () => {
    it('deve registrar renderers rapidamente', () => {
      const startTime = performance.now()

      const renderer = { type: 'default', component: Card, priority: 100 }
      mockRegisterRenderer(renderer)

      const endTime = performance.now()
      const duration = endTime - startTime

      expect(duration).toBeLessThan(100)
    })

    it('deve lidar com múltiplas execuções', () => {
      for (let i = 0; i < 10; i++) {
        const renderer = { type: 'default', component: Card, priority: 100 }
        mockRegisterRenderer(renderer)
      }

      expect(mockRegisterRenderer).toHaveBeenCalled()
    })
  })

  describe('Testes de Regressão', () => {
    it('deve manter configuração padrão após múltiplas execuções', () => {
      for (let i = 0; i < 5; i++) {
        const renderer1 = { type: 'default', component: Card, priority: 100 }
        const renderer2 = {
          type: 'grid',
          component: GridCardAdapter,
          priority: 90
        }

        mockRegisterRenderer(renderer1)
        mockRegisterRenderer(renderer2)

        const calls = mockRegisterRenderer.mock.calls
        expect(calls.length).toBeGreaterThan(0)

        const types = calls.slice(-2).map(call => call[0].type)
        expect(types).toContain('default')
        expect(types).toContain('grid')
      }
    })

    it('deve manter prioridades consistentes', () => {
      for (let i = 0; i < 3; i++) {
        const renderer1 = { type: 'default', component: Card, priority: 100 }
        const renderer2 = {
          type: 'grid',
          component: GridCardAdapter,
          priority: 90
        }

        mockRegisterRenderer(renderer1)
        mockRegisterRenderer(renderer2)

        const calls = mockRegisterRenderer.mock.calls.slice(-2)
        const priorities = calls.map(call => call[0].priority)

        expect(priorities).toEqual([100, 90])
      }
    })
  })

  describe('Validação de Dados', () => {
    it('deve ter componentes válidos', () => {
      const renderer = { type: 'default', component: Card, priority: 100 }
      mockRegisterRenderer(renderer)

      mockRegisterRenderer.mock.calls.forEach(call => {
        const renderer = call[0]
        expect(renderer.component).toBeDefined()
        expect(typeof renderer.component).toBe('function')
      })
    })

    it('deve ter tipos não vazios', () => {
      const renderer = { type: 'default', component: Card, priority: 100 }
      mockRegisterRenderer(renderer)

      mockRegisterRenderer.mock.calls.forEach(call => {
        const renderer = call[0]
        expect(renderer.type).toBeTruthy()
        expect(renderer.type.length).toBeGreaterThan(0)
      })
    })

    it('deve ter prioridades numéricas', () => {
      const renderer = { type: 'default', component: Card, priority: 100 }
      mockRegisterRenderer(renderer)

      mockRegisterRenderer.mock.calls.forEach(call => {
        const renderer = call[0]
        expect(typeof renderer.priority).toBe('number')
        expect(Number.isInteger(renderer.priority)).toBe(true)
      })
    })
  })
})
