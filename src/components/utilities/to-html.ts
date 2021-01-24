import escapeHtml from 'escape-html'
import NxSlateSerialize from '@jswork/next-slate-serialize';
import { jsx } from 'slate-hyperscript';

export const toHtml = (inNodes) => {
  const process = (node, children) => {
    switch (node.type) {
      case 'quote':
        return `<blockquote><p>${children}</p></blockquote>`
      case 'paragraph':
        return `<p>${children}</p>`
      case 'link':
        return `<a href="${escapeHtml(node.url)}">${children}</a>`
      case 'latex':
        return `<span data-latex="${node.value}"></span>`
      default:
        return children
    }
  }

  return NxSlateSerialize.stringify(inNodes, { process })
}



export const fromHtml = (inHtml) => {
  const process = (el, children) => {
    switch (el.nodeName) {
      case 'BODY':
        return jsx('fragment', {}, children);
      case 'BR':
        return '\n';
      case 'BLOCKQUOTE':
        return jsx('element', { type: 'quote' }, children);
      case 'P':
        return jsx('element', { type: 'paragraph' }, children);
      case 'A':
        return jsx('element', { type: 'link', url: el.getAttribute('href') }, children);
      case 'SPAN' && el.getAttribute('data-latex'):
        return jsx('element', { type: 'latex', value: el.getAttribute('data-latex') }, children)
      default:
        return el.textContent;
    }
  }
  return NxSlateSerialize.parse(inHtml, { process });
}
