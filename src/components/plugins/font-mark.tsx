import React, { useEffect, useState } from 'react';

export default {
  name: 'font-mark',
  hooks: {
    leaf: (inContext, inProps) => {
      const { attributes, children, leaf } = inProps;
      const fontWeight = leaf.bold ? 'bold' : 'normal';
      const fontStyle = leaf.italic ? 'italic' : 'normal';
      let textDecoration = 'normal';

      leaf.strikethrough && (textDecoration = 'line-through');
      leaf.underline && (textDecoration = 'underline');

      return (
        <span
          {...attributes}
          style={{
            fontWeight,
            fontStyle,
            textDecoration
          }}>
          {children}
        </span>
      );
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
