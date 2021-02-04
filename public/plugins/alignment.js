import React from 'react';
import { Path, Node } from 'slate';
import { jsx } from 'slate-hyperscript';
import {
  Slate,
  Editable,
  withReact,
  DefaultElement,
  ReactEditor
} from 'slate-react';
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
    element: (inContext, { attributes, children, element }) => {
      const { value } = element;
      const path = ReactEditor.findPath(inContext.editor, element);

      // console.log( Node.get(Path.parent(path), path));
      return (
        <div style={{ textAlign: value }} {...attributes}>
          {children}
        </div>
      );
    }
  }
};
