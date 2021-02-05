import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxSlatePlugin from '@jswork/next-slate-plugin';

/**
 * @usage:
 * Transforms.setNodes(editor, { type:'list-item' })
 */

export default NxSlatePlugin.define({
  id: 'list-item',
  serialize: {
    input: (el, children) => {
      const nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'li') {
        return jsx('element', { type: 'list-item' }, children);
      }
    },
    output: (node, children) => {
      return `<li>${children}</li>`;
    }
  },
  render: (_, { attributes, children, element }) => {
    // console.log('list item render.', element);
    const { alignment } = element;
    return (
      <li style={{ textAlign: alignment }} {...attributes}>
        {children}
      </li>
    );
  }
});
