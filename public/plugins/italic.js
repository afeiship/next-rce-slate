import React from 'react';
import { jsx } from 'slate-hyperscript';

export default {
  name: 'italic',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'span' && el.style.fontStyle === 'italic') {
      return jsx('text', { italic: true }, children);
    }
  },
  exporter: (el) => {
    el.style.fontStyle = 'italic';
    return el;
  },
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      return <em {...attributes}>{children}</em>;
    }
  }
};
