import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxSlatePlugin from '@jswork/next-slate-plugin';

/**
 * @usage:
 * Editor.addMark(editor,'backgroundColor', 'lightgreen');
 */

export default NxSlatePlugin.define({
  id: 'backgroundColor',
  serialize: {
    input: (el, children) => {
      const nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'span' && el.style.backgroundColor) {
        return jsx(
          'text',
          { backgroundColor: el.style.backgroundColor },
          children
        );
      }
    },
    output: ({ el }, node) => {
      el.style.backgroundColor = node.backgroundColor;
      return el;
    }
  },
  render: (_, { attributes, children, leaf }) => {
    const { backgroundColor } = leaf;
    return (
      <span style={{ backgroundColor }} {...attributes}>
        {children}
      </span>
    );
  }
});
