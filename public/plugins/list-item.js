import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Transforms.setNodes(editor, { type:'list-item' })
 */

export default {
  name: 'list-item',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'li') {
      return jsx('element', { type: 'list-item' }, children);
    }
  },
  exporter: (node, children) => {
    return `<li>${children}</li>`;
  },
  hooks: {
    element: (_, { attributes, children, element }) => {
      return <li {...attributes}>{children}</li>;
    }
  }
};
