import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Editor.addMark(editor,'underline', true)
 */

export default {
  name: 'underline',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'u') {
      return jsx('text', { underline: true }, children);
    }
  },
  exporter: (el) => {
    const u = document.createElement('u');
    u.appendChild(el);
    return u;
  },
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      return <u {...attributes}>{children}</u>;
    }
  }
};
