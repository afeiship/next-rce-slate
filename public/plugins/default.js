import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxSlatePlugin from '@jswork/next-slate-plugin';
import NxCssText from '@jswork/next-css-text';
import nxIsBlockElement from '@jswork/next-is-block-element';
/**
 * @usage:
 * Transforms.setNodes(editor, { type:'default' })
 *
 * 注意这里的 style处理，所有的 block 元素，都有可能被直接设置 style;
 * input/output 都需要针对style写一些代码
 */

export default NxSlatePlugin.define({
  id: 'default',
  serialize: {
    input: ({ el }, children) => {
      if (nxIsBlockElement(el)) {
        const css = el.style.cssText;
        return jsx('element', { type: 'default', style: NxCssText.css2obj(css) }, children);
      }
    },
    output: (node, children) => {
      const { style } = node;
      return `<div${style} class='react-rte__default'>${children}</div>`;
    }
  },
  render: (_, { attributes, children, element }) => {
    return (
      <div className="react-rte__default" {...attributes}>
        {children}
      </div>
    );
  }
});
