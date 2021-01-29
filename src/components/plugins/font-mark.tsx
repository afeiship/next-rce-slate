import React, { useEffect, useState } from 'react';

export default {
  name: 'font-mark',
  // to-html
  exporter: (node, children) => {
    if (!children) {
      let cssText = '';
      if (node.bold) {
        cssText = 'font-weight: bold;';
      }

      if (node.italic) {
        cssText += 'font-style: italic;';
      }

      if (node.strikethrough) {
        cssText += 'text-decoration: line-through;';
      }
      return cssText ? `<span style="${cssText}">${node.text}</span>` : node.text;
    }
  },
  hooks: {
    leaf: (inContext, { attributes, children, leaf }) => {
      if (leaf.bold) {
        children = <strong>{children}</strong>;
      }

      if (leaf.code) {
        children = <code>{children}</code>;
      }

      if (leaf.italic) {
        children = <em>{children}</em>;
      }

      if (leaf.strikethrough) {
        children = <del>{children}</del>;
      }

      return <span {...attributes}>{children}</span>;
    }
  }
};

/*
context.editor.addMark('strikethrough', true);
context.editor.addMark('bold', true);
context.editor.addMark('italic', true);

context.editor.removeMark('strikethrough')
context.editor.removeMark('bold')
context.editor.removeMark('italic')


context.editor.removeMark(['italic','bold']);

*/
