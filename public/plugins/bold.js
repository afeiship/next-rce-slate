import React from 'react';
import { jsx } from 'slate-hyperscript';

export default {
  name: 'bold',
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
