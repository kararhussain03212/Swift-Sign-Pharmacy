const ALLOWED_TAGS = new Set([
  'P', 'BR', 'STRONG', 'B', 'EM', 'I', 'U',
  'H2', 'H3', 'UL', 'OL', 'LI', 'A', 'BLOCKQUOTE', 'SPAN',
])

const ALLOWED_ATTRS = {
  A: new Set(['href', 'target', 'rel']),
}

const SAFE_URL = /^(https?:|mailto:|tel:|\/|#)/i

function sanitizeNode(node) {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) continue

    if (child.nodeType !== Node.ELEMENT_NODE || !ALLOWED_TAGS.has(child.tagName)) {
      node.removeChild(child)
      continue
    }

    for (const attr of Array.from(child.attributes)) {
      const allowed = ALLOWED_ATTRS[child.tagName]
      if (!allowed || !allowed.has(attr.name.toLowerCase())) {
        child.removeAttribute(attr.name)
        continue
      }
      if (attr.name.toLowerCase() === 'href' && !SAFE_URL.test(attr.value.trim())) {
        child.removeAttribute(attr.name)
      }
    }

    if (child.tagName === 'A') {
      child.setAttribute('target', '_blank')
      child.setAttribute('rel', 'noopener noreferrer')
    }

    sanitizeNode(child)
  }
}

export function sanitizeHtml(html) {
  const raw = String(html || '')
  if (!raw) return ''

  const doc = new DOMParser().parseFromString(raw, 'text/html')
  sanitizeNode(doc.body)
  return doc.body.innerHTML
}
