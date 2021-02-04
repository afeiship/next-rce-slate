import React from 'react';
import { jsx } from 'slate-hyperscript';

/**
 * @usage:
 * Transforms.setNodes(editor, { type:'heading', value: 1})
 */

const HEADING_RE = /h([1-6])$/;

const isHeading = (tag) => {
  return HEADING_RE.test(tag);
};

export default {
  name: 'heading',
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    if (isHeading(nodeName)) {
      const num = HEADING_RE.exec(nodeName);
      return jsx('element', { type: 'heading', value: num }, children);
    }
  },
  exporter: (node, children) => {
    const { type, value } = node;
    return `<h${value}>${children}</h${value}>`;
  },
  hooks: {
    element: (_, { attributes, children, element }) => {
      return React.createElement(`h${element.value}`, attributes, children);
    }
  }
};
