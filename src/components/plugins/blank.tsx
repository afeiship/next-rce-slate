import React from 'react';
import { jsx } from 'slate-hyperscript';

export default {
  name: 'blank',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'blank') {
      return jsx('text', { blank: true }, children);
    }
  },
  // to-html
  exporter: (node, children) => {
    if (!children) {
      if (node.blank) {
        return `<blank>${node.text}</blank>`;
      }
    }
  },
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      if (leaf.blank) {
        return <blank {...attributes}>{children}</blank>;
      }
    }
  }
};
