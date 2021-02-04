import React from 'react';
import { jsx } from 'slate-hyperscript';

export default {
  name: 'underline',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'span' && el.style.textDecoration === 'underline') {
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
