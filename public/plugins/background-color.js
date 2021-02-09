import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxSlatePlugin from '@jswork/next-slate-plugin';

/**
 * @usage:
 * Editor.addMark(editor,'background-color', 'lightgreen');
 */

export default NxSlatePlugin.define({
  id: 'background-color',
  serialize: {
    input: ({ el }, children) => {
      const nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'span' && el.style.backgroundColor) {
        return jsx('text', { backgroundColor: el.style.backgroundColor }, children);
      }
    },
    output: (node, children) => {
      const el = node.el;
      el.style.backgroundColor = node['background-color'];
      return el;
    }
  },
  render: (_, { attributes, children, leaf }) => {
    return (
      <span style={{ backgroundColor: leaf['background-color'] }} {...attributes}>
        {children}
      </span>
    );
  }
});
