export const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  try {
    window.scrollTo({ top: 0, behavior })

    if (behavior === 'smooth') {
      setTimeout(() => {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 100)
    } else {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  } catch (error) {
    console.error('Erro no scrollToTop:', error)
    window.scrollTo(0, 0)
  }
}
