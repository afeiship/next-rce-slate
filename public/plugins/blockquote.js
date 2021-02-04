import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Transforms.setNodes(editor, { type:'blockquote' })
 */

export default {
  name: 'blockquote',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'blockquote') {
      return jsx('element', { type: 'blockquote' }, children);
    }
  },
  exporter: (node, children) => {
    return `<blockquote>${children}</blockquote>`;
  },
  hooks: {
    element: (_, { attributes, children, element }) => {
      console.log('element', element, attributes, children);
      return <blockquote {...attributes}>{children}</blockquote>;
    }
  }
};
