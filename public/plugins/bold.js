import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Editor.addMark(editor,'bold', true)
 */

export default {
  name: 'bold',
  hotkey: ['mod+b'],
  isInline: true,
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'span' && el.style.fontStyle === 'bold') {
      return jsx('text', { bold: true }, children);
    }
  },
  exporter: (el) => {
    el.style.fontWeight = 'bold';
    return el;
  },
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      return <strong {...attributes}>{children}</strong>;
    }
  }
};
