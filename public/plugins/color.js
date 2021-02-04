import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Editor.addMark(editor,'color', '#f00')
 */

export default {
  name: 'color',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'span' && el.style.color) {
      return jsx('text', { color: el.style.color }, children);
    }
  },
  exporter: (el, node) => {
    el.style.color = node.color;
    return el;
  },
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      const { color } = leaf;
      return (
        <span style={{ color }} {...attributes}>
          {children}
        </span>
      );
    }
  }
};
