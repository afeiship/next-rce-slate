import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxSlatePlugin from '@jswork/next-slate-plugin';
/**
 * @usage:
 * Active:
// https://github.com/ianstormtaylor/slate/blob/master/site/examples/richtext.tsx
Transforms.setNodes(editor, { type:'list-item' })
Transforms.wrapNodes(editor, { type: 'numbered-list', children: [] })

Deactive:
Transforms.unwrapNodes(editor, {
    match: n =>
      ['numbered-list','bulleted-list'].includes(
        !Editor.isEditor(n) && n.type
      ),
    split: true,
  })
Transforms.setNodes(editor, { type:'paragraph' })
 */

export default NxSlatePlugin.define({
  id: 'numbered-list',
  serialize: {
    input: ({ el }, children) => {
      const nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'ol') {
        return jsx('element', { type: 'numbered-list' }, children);
      }
    },
    output: (node, children) => {
      return `<ol>${children}</ol>`;
    }
  },
  render: (_, { attributes, children, element }) => {
    return <ol {...attributes}>{children}</ol>;
  }
});
