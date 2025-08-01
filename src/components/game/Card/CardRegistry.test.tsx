import React from 'react'
import { CardRegistry } from './CardRegistry'
import type { CardRenderer, CardRendererProps } from './types'

const MockComponent1 = () => <div>Componente 1</div>
const MockComponent2 = () => <div>Componente 2</div>
const MockComponent3 = () => <div>Componente 3</div>

describe('CardRegistry', () => {
  let registry: CardRegistry

  beforeEach(() => {
    registry = new CardRegistry()
  })

  describe('Registro de Renderers', () => {
    it('deve registrar um renderer com sucesso', () => {
      const renderer: CardRenderer = {
        type: 'test',
        component: MockComponent1,
        priority: 100
      }

      registry.registerRenderer(renderer)

      const retrieved = registry.getRenderer('test')
      expect(retrieved).toBeDefined()
      expect(retrieved?.type).toBe('test')
      expect(retrieved?.component).toBe(MockComponent1)
      expect(retrieved?.priority).toBe(100)
    })

    it('deve registrar múltiplos renderers', () => {
      const renderer1: CardRenderer = {
        type: 'type1',
        component: MockComponent1,
        priority: 100
      }

      const renderer2: CardRenderer = {
        type: 'type2',
        component: MockComponent2,
        priority: 90
      }

      registry.registerRenderer(renderer1)
      registry.registerRenderer(renderer2)

      expect(registry.getRenderer('type1')).toBeDefined()
      expect(registry.getRenderer('type2')).toBeDefined()
    })

    it('deve sobrescrever renderer existente', () => {
      const renderer1: CardRenderer = {
        type: 'test',
        component: MockComponent1,
        priority: 100
      }

      const renderer2: CardRenderer = {
        type: 'test',
        component: MockComponent2,
        priority: 90
      }

      registry.registerRenderer(renderer1)
      registry.registerRenderer(renderer2)

      const retrieved = registry.getRenderer('test')
      expect(retrieved?.component).toBe(MockComponent2)
      expect(retrieved?.priority).toBe(90)
    })

    it('deve registrar renderer sem priority', () => {
      const renderer: CardRenderer = {
        type: 'test',
        component: MockComponent1
      }

      registry.registerRenderer(renderer)

      const retrieved = registry.getRenderer('test')
      expect(retrieved).toBeDefined()
      expect(retrieved?.priority).toBeUndefined()
    })
  })

  describe('Recuperação de Renderers', () => {
    it('deve retornar renderer por tipo', () => {
      const renderer: CardRenderer = {
        type: 'specific',
        component: MockComponent1
      }

      registry.registerRenderer(renderer)

      const retrieved = registry.getRenderer('specific')
      expect(retrieved).toBeDefined()
      expect(retrieved?.type).toBe('specific')
    })

    it('deve retornar undefined para tipo inexistente', () => {
      const retrieved = registry.getRenderer('inexistente')
      expect(retrieved).toBeUndefined()
    })

    it('deve retornar undefined para tipo vazio', () => {
      const retrieved = registry.getRenderer('')
      expect(retrieved).toBeUndefined()
    })

    it('deve retornar undefined para tipo null', () => {
      const retrieved = registry.getRenderer(null as unknown as string)
      expect(retrieved).toBeUndefined()
    })

    it('deve retornar undefined para tipo undefined', () => {
      const retrieved = registry.getRenderer(undefined as unknown as string)
      expect(retrieved).toBeUndefined()
    })
  })

  describe('Default Renderer', () => {
    it('deve definir primeiro renderer como default', () => {
      const renderer: CardRenderer = {
        type: 'first',
        component: MockComponent1
      }

      registry.registerRenderer(renderer)

      const defaultRenderer = registry.getDefaultRenderer()
      expect(defaultRenderer).toBeDefined()
      expect(defaultRenderer?.type).toBe('first')
    })

    it('deve manter primeiro renderer como default mesmo após novos registros', () => {
      const renderer1: CardRenderer = {
        type: 'first',
        component: MockComponent1
      }

      const renderer2: CardRenderer = {
        type: 'second',
        component: MockComponent2
      }

      registry.registerRenderer(renderer1)
      registry.registerRenderer(renderer2)

      const defaultRenderer = registry.getDefaultRenderer()
      expect(defaultRenderer?.type).toBe('first')
    })

    it('deve retornar undefined quando não há renderers', () => {
      const defaultRenderer = registry.getDefaultRenderer()
      expect(defaultRenderer).toBeUndefined()
    })

    it('deve manter default após sobrescrever renderer', () => {
      const renderer1: CardRenderer = {
        type: 'first',
        component: MockComponent1
      }

      const renderer2: CardRenderer = {
        type: 'second',
        component: MockComponent2
      }

      registry.registerRenderer(renderer1)
      registry.registerRenderer(renderer2)

      const updatedRenderer2: CardRenderer = {
        type: 'second',
        component: MockComponent3
      }

      registry.registerRenderer(updatedRenderer2)

      const defaultRenderer = registry.getDefaultRenderer()
      expect(defaultRenderer?.type).toBe('first')
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com tipo vazio', () => {
      const renderer: CardRenderer = {
        type: '',
        component: MockComponent1
      }

      registry.registerRenderer(renderer)

      const retrieved = registry.getRenderer('')
      expect(retrieved).toBeDefined()
      expect(retrieved?.type).toBe('')
    })

    it('deve lidar com tipo com espaços', () => {
      const renderer: CardRenderer = {
        type: '  spaced  ',
        component: MockComponent1
      }

      registry.registerRenderer(renderer)

      const retrieved = registry.getRenderer('  spaced  ')
      expect(retrieved).toBeDefined()
      expect(retrieved?.type).toBe('  spaced  ')
    })

    it('deve lidar com tipos especiais', () => {
      const specialTypes = [
        '!@#$%',
        '123',
        'camelCase',
        'snake_case',
        'kebab-case'
      ]

      specialTypes.forEach(type => {
        const renderer: CardRenderer = {
          type,
          component: MockComponent1
        }

        registry.registerRenderer(renderer)

        const retrieved = registry.getRenderer(type)
        expect(retrieved).toBeDefined()
        expect(retrieved?.type).toBe(type)
      })
    })

    it('deve lidar com componentes null', () => {
      const renderer: CardRenderer = {
        type: 'test',
        component: null as unknown as React.ComponentType<CardRendererProps>
      }

      registry.registerRenderer(renderer)

      const retrieved = registry.getRenderer('test')
      expect(retrieved).toBeDefined()
      expect(retrieved?.component).toBeNull()
    })

    it('deve lidar com componentes undefined', () => {
      const renderer: CardRenderer = {
        type: 'test',
        component:
          undefined as unknown as React.ComponentType<CardRendererProps>
      }

      registry.registerRenderer(renderer)

      const retrieved = registry.getRenderer('test')
      expect(retrieved).toBeDefined()
      expect(retrieved?.component).toBeUndefined()
    })
  })

  describe('Performance', () => {
    it('deve lidar com muitos renderers', () => {
      const renderers: CardRenderer[] = []

      for (let i = 0; i < 100; i++) {
        renderers.push({
          type: `type${i}`,
          component: MockComponent1,
          priority: 100 - i
        })
      }

      renderers.forEach(renderer => {
        registry.registerRenderer(renderer)
      })

      for (let i = 0; i < 100; i++) {
        const retrieved = registry.getRenderer(`type${i}`)
        expect(retrieved).toBeDefined()
        expect(retrieved?.type).toBe(`type${i}`)
      }
    })

    it('deve manter performance com múltiplas consultas', () => {
      const renderer: CardRenderer = {
        type: 'test',
        component: MockComponent1
      }

      registry.registerRenderer(renderer)

      for (let i = 0; i < 1000; i++) {
        const retrieved = registry.getRenderer('test')
        expect(retrieved).toBeDefined()
      }
    })

    it('deve lidar com registros e consultas alternados', () => {
      for (let i = 0; i < 50; i++) {
        const renderer: CardRenderer = {
          type: `type${i}`,
          component: MockComponent1
        }

        registry.registerRenderer(renderer)

        const retrieved = registry.getRenderer(`type${i}`)
        expect(retrieved).toBeDefined()
      }
    })
  })

  describe('Integração', () => {
    it('deve funcionar com diferentes tipos de componentes', () => {
      const FunctionComponent = ({ game }: CardRendererProps) => (
        <div>Function: {game.name}</div>
      )
      const ClassComponent = class extends React.Component<CardRendererProps> {
        render() {
          return <div>Class: {this.props.game.name}</div>
        }
      }

      const renderer1: CardRenderer = {
        type: 'function',
        component: FunctionComponent
      }

      const renderer2: CardRenderer = {
        type: 'class',
        component: ClassComponent
      }

      registry.registerRenderer(renderer1)
      registry.registerRenderer(renderer2)

      expect(registry.getRenderer('function')?.component).toBe(
        FunctionComponent
      )
      expect(registry.getRenderer('class')?.component).toBe(ClassComponent)
    })

    it('deve manter isolamento entre instâncias', () => {
      const registry1 = new CardRegistry()
      const registry2 = new CardRegistry()

      const renderer: CardRenderer = {
        type: 'test',
        component: MockComponent1
      }

      registry1.registerRenderer(renderer)

      expect(registry1.getRenderer('test')).toBeDefined()
      expect(registry2.getRenderer('test')).toBeUndefined()
    })
  })

  describe('Testes de Regressão', () => {
    it('deve manter comportamento após múltiplos ciclos de registro/consulta', () => {
      for (let cycle = 0; cycle < 10; cycle++) {
        const renderer: CardRenderer = {
          type: `cycle${cycle}`,
          component: MockComponent1
        }

        registry.registerRenderer(renderer)

        const retrieved = registry.getRenderer(`cycle${cycle}`)
        expect(retrieved).toBeDefined()
        expect(retrieved?.type).toBe(`cycle${cycle}`)
      }
    })

    it('deve manter default renderer após múltiplos ciclos', () => {
      for (let i = 0; i < 10; i++) {
        const renderer: CardRenderer = {
          type: `type${i}`,
          component: MockComponent1
        }

        registry.registerRenderer(renderer)

        const defaultRenderer = registry.getDefaultRenderer()
        expect(defaultRenderer?.type).toBe('type0')
      }
    })
  })
})
