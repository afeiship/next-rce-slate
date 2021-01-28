import React, { useEffect, useState } from 'react';

export default {
  name: 'font-mark',
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

      if (leaf.underline) {
        children = <u>{children}</u>;
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
