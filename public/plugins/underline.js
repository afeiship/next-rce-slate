import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxSlatePlugin from '@jswork/next-slate-plugin';

/**
 * @usage:
 * Editor.addMark(editor,'underline', true)
 */

export default NxSlatePlugin.define({
  id: 'underline',
  type: 'format',
  serialize: {
    input: (el, children) => {
      const nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'u') {
        return jsx('text', { underline: true }, children);
      }
    },
    output: ({ el }) => {
      const u = document.createElement('u');
      u.appendChild(el);
      return u;
    }
  },
  render: (_, { attributes, children, leaf }) => {
    return <u {...attributes}>{children}</u>;
  }
});
