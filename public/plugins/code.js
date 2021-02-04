import React from 'react';
import { jsx } from 'slate-hyperscript';

export default {
  name: 'code',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (nodeName === 'code') {
      return jsx('text', { code: true }, children);
    }
  },
  exporter: (el) => {
    const code = document.createElement('code');
    code.appendChild(el);
    return code;
  },
  hooks: {
    leaf: (_, { attributes, children, leaf }) => {
      return <code {...attributes}>{children}</code>;
    }
  }
};
