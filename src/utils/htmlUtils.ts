export const sanitizeHTML = (html: string): string => {
  const dangerousTags = [
    'script',
    'iframe',
    'object',
    'embed',
    'form',
    'input',
    'button',
    'select',
    'textarea'
  ]

  let sanitized = html

  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gis')
    sanitized = sanitized.replace(regex, '')
  })

  const dangerousAttributes = [
    'onclick',
    'onload',
    'onerror',
    'onmouseover',
    'onmouseout',
    'onfocus',
    'onblur',
    'onchange',
    'onsubmit',
    'onreset',
    'onkeydown',
    'onkeyup',
    'onkeypress'
  ]

  dangerousAttributes.forEach(attr => {
    const regex = new RegExp(`${attr}="[^"]*"`, 'gi')
    sanitized = sanitized.replace(regex, '')
  })

  return sanitized
}

export const truncateHTML = (html: string, maxLength: number = 500): string => {
  if (html.length <= maxLength) {
    return html
  }

  const textOnly = html.replace(/<[^>]*>/g, '')

  if (textOnly.length <= maxLength) {
    return html
  }

  let truncated = textOnly.substring(0, maxLength)
  truncated = truncated.substring(0, truncated.lastIndexOf(' ')) + '...'

  return truncated
}
