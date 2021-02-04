/*
直接插入一个新行:
const paragraph = { type: 'paragraph', children: [{ text: '' }] }
Transforms.insertNodes(editor, paragraph)
*/
export default {
  name: 'force-layout',
  decorator: (editor) => {
    return editor;
  }
};
