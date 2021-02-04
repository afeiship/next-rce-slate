/*
直接插入一个新行:
const paragraph = { type: 'paragraph', children: [{ text: '' }] }
Transforms.insertNodes(editor, paragraph)
*/
import { createEditor, Editor, Text, Transforms } from 'slate';
import { Path,Node } from 'slate';
import { useSelected, ReactEditor, useSlate } from 'slate-react';

export default {
  name: 'force-layout',
  decorator: (editor) => {
    const { normalizeNode } = editor;
    editor.normalizeNode = ([node, path]) => {
      // const path1 = ReactEditor.findPath(editor, node);
      // console.log(path, path1);
      console.log(node, path);

      if (path.length > 2) {
        // Editor.previous
        // const nextPath = Path.next(path);

        // console.log(Node.get(node, nextPath));
        // const previous = Editor.above(editor);
        // const el = previous[0];
        // console.log(el);

        // if(!node.text) {
        //   console.log('tow emtny');
        // }
        // const previousNode = Editor
        // console.log(node, path, previousPath);
      }
      // console.log(node, Editor.previous(editor, { at: Path.previous(path) }));
      // if (path.length === 0) {
      //   if (editor.children.length < 2) {
      //     const paragraph = { type: 'paragraph', children: [{ text: '' }] };
      //     Transforms.insertNodes(editor, paragraph);
      //   }
      // }
      return normalizeNode([node, path]);
    };
    return editor;
  }
};
