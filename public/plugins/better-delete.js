import { createEditor, Editor, Text, Transforms } from 'slate';
import { Path } from 'slate';
import { useSelected, ReactEditor, useSlate } from 'slate-react';

export default {
  name: 'better-delete',
  decorator: (editor) => {
    const { deleteBackward } = editor;
    editor.deleteBackward = (...args) => {
      // console.log('args:', args);
      deleteBackward(...args);


      // const match = Editor.above(editor, {
      //   match: (n) => ['list-item', 'blockquote'].includes(n.type)
      // });

      // if (match) {
      //   console.log('match...', match);
      //   const [node, at] = match;
      //   if (Editor.isEmpty(editor, node)) {
      //   }else{
      //     deleteBackward(...args);
      //   }
      //   console.log(node, at, Editor.isEmpty(editor, node));
      //   // if(node.children)
      //   // quick fix for list item
      //   // Transforms.setNodes(editor, { type: 'paragraph' });
      // }
    };
    return editor;
  }
};
