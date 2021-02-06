import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxSlatePlugin from '@jswork/next-slate-plugin';
import NxCssText from '@jswork/next-css-text';
/**
 * @usage:
 * Transforms.setNodes(editor, { type:'blockquote' })
 *
 * 注意这里的 style处理，所有的 block 元素，都有可能被直接设置 style;
 * input/output 都需要针对style写一些代码
 */

export default NxSlatePlugin.define({
  id: 'paragraph',
  serialize: {
    input: ({ el }, children) => {
      const nodeName = el.nodeName.toLowerCase();
      if (nodeName === 'p') {
        const css = el.style.cssText;
        return jsx('element', { type: 'paragraph', style: NxCssText.css2obj(css) }, children);
      }
    },
    output: (node, children) => {
      const { style } = node;
      return `<p${style}>${children}</p>`;
    }
  },
  render: (_, { attributes, children, element }) => {
    return <p {...attributes}>{children}</p>;
  }
});
