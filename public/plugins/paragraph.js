import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Transforms.setNodes(editor, { type:'blockquote' })
 */

export default {
  name: 'paragraph',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'p') {
      return jsx('element', { type: 'paragraph' }, children);
    }
  },
  exporter: (node, children) => {
    return `<p>${children}</p>`;
  },
  hooks: {
    element: (_, { attributes, children, element }) => {
      return <p {...attributes}>{children}</p>;
    }
  }
};
