import React from 'react';
import { jsx } from 'slate-hyperscript';

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

export default {
  name: 'numbered-list',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'ol') {
      return jsx('element', { type: 'numbered-list' }, children);
    }
  },
  exporter: (node, children) => {
    return `<ol>${children}</ol>`;
  },
  hooks: {
    element: (_, { attributes, children, element }) => {
      return <ol {...attributes}>{children}</ol>;
    }
  }
};
