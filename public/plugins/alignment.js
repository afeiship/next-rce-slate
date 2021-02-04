import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Transforms.setNodes(editor, { type:'alignment', value: 'right'});
 *
 * <div style="text-align:center">
 *  <p>xxx</p>
 * </div>
 */

export default {
  name: 'alignment',
  importer: (el, children) => {
    if (el.style.textAlign) {
      return jsx('element', { textAlign: el.style.textAlign }, children);
    }
  },
  exporter: (node, children) => {
    return `<div style="text-align: ${node.value}">${children}</div>`;
  },
  hooks: {
    element: (_, { attributes, children, element }) => {
      const { value } = element;
      return (
        <div style={{ textAlign: value }} {...attributes}>
          {children}
        </div>
      );
    }
  }
};
