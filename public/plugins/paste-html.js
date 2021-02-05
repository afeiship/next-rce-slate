import { createEditor, Editor, Text, Transforms } from 'slate';
import NxSlatePlugin from '@jswork/next-slate-plugin';

// https://github.com/ckeditor/ckeditor5

export default NxSlatePlugin.define({
  id: 'paste-html',
  decorator: (editor) => {
    console.log(editor);
    const { insertData, isInline, isVoid } = editor;
    editor.insertData = (data) => {
      const html = data.getData('text/html');
      /**
       * 这个说明 `deserialize` 或者说 exporter 应该不与 this.editor有关，只与 plugins 有关
       */

       console.log(html);

      if (html) {
        // const parsed = new DOMParser().parseFromString(html, 'text/html');
        const fragment = editor.context.handleSerialize('importer',html);
        Transforms.insertFragment(editor, fragment);
        return;
      }

      insertData(data);
    };

    return editor;
  }
});
