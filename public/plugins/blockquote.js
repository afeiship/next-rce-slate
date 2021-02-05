import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxSlatePlugin from '@jswork/next-slate-plugin';

/**
 * @usage:
 * Transforms.setNodes(editor, { type:'blockquote' })
 */

export default NxSlatePlugin.define({
  id: 'blockquote',
  serialize: {
    input: (el, children) => {
      const nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'blockquote') {
        return jsx('element', { type: 'blockquote' }, children);
      }
    },
    output: (node, children) => {
      return `<blockquote>${children}</blockquote>`;
    }
  },
  render: (_, { attributes, children, element }) => {
    return <blockquote {...attributes}>{children}</blockquote>;
  }
});
