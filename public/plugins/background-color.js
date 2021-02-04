import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Editor.addMark(editor,'backgroundColor', 'lightgreen');
 */

export default {
  name: 'backgroundColor',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'span' && el.style.backgroundColor) {
      return jsx(
        'text',
        { backgroundColor: el.style.backgroundColor },
        children
      );
    }
  },
  exporter: (el, node) => {
    el.style.backgroundColor = node.backgroundColor;
    return el;
  },
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      const { backgroundColor } = leaf;
      return (
        <span style={{ backgroundColor }} {...attributes}>
          {children}
        </span>
      );
    }
  }
};
