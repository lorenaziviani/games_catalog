import GridCardAdapter from './adapters/GridCardAdapter'
import { cardRegistry } from './CardRegistry'
import Card from './index'
import type { CardRenderer } from './types'

const registerExistingCards = () => {
  const renderers: CardRenderer[] = [
    {
      type: 'default',
      component: Card,
      priority: 100
    },
    {
      type: 'grid',
      component: GridCardAdapter,
      priority: 90
    }
  ]

  renderers.forEach(renderer => {
    cardRegistry.registerRenderer(renderer)
  })
}

registerExistingCards()

export { cardRegistry }
