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

  getAllRenderers(): CardRenderer[] {
    return Array.from(this.renderers.values()).sort((a, b) => {
      const priorityA = a.priority || 0
      const priorityB = b.priority || 0
      return priorityB - priorityA
    })
  }

  getDefaultRenderer(): CardRenderer | undefined {
    return this.renderers.get(this.defaultType)
  }

  setDefaultRenderer(type: string): void {
    if (this.renderers.has(type)) {
      this.defaultType = type
    }
  }

  hasRenderer(type: string): boolean {
    return this.renderers.has(type)
  }

  removeRenderer(type: string): boolean {
    const removed = this.renderers.delete(type)

    if (removed && type === this.defaultType) {
      const remaining = this.getAllRenderers()
      if (remaining.length > 0) {
        this.defaultType = remaining[0].type
      }
    }

    return removed
  }
}

export const cardRegistry = new CardRegistry()
