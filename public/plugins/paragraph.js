import React from 'react';
import { jsx } from 'slate-hyperscript';
import NxCssText from '@jswork/next-css-text';
/**
 * @usage:
 * Transforms.setNodes(editor, { type:'blockquote' })
 */

export default {
  name: 'paragraph',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'p') {
      const css = el.style.cssText;
      const style = css ? NxCssText.css2obj(css) : null;
      return jsx('element', { type: 'paragraph', style }, children);
    }
  },
  exporter: (node, children) => {
    const { style } = node;
    return `<p style="${NxCssText.obj2css(style)}">${children}</p>`;
  },
  hooks: {
    element: (_, { attributes, children, element }) => {
      return <p {...attributes}>{children}</p>;
    }
  }
};
