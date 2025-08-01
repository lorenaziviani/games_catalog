import type { CardRenderer, CardRegistry as ICardRegistry } from './types'

export class CardRegistry implements ICardRegistry {
  private renderers: Map<string, CardRenderer> = new Map()
  private defaultType: string = 'default'

  registerRenderer(renderer: CardRenderer): void {
    this.renderers.set(renderer.type, renderer)

    if (this.renderers.size === 1) {
      this.defaultType = renderer.type
    }
  }

  getRenderer(type: string): CardRenderer | undefined {
    return this.renderers.get(type)
  }

  getDefaultRenderer(): CardRenderer | undefined {
    return this.renderers.get(this.defaultType)
  }
}

export const cardRegistry = new CardRegistry()
