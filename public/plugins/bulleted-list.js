import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Active:
 * Transforms.setNodes(editor, { type:'list-item' })
 * Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] })
 */

export default {
  name: 'bulleted-list',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'ul') {
      return jsx('element', { type: 'bulleted-list' }, children);
    }
  },
  exporter: (node, children) => {
    return `<ul>${children}</ul>`;
  },
  hooks: {
    element: (_, { attributes, children, element }) => {
      return <ul {...attributes}>{children}</ul>;
    }
  }
};
