/**
Statics: 这个key 订是扩展 Editor 的方法
其实也可以直接 Object.assign(Editor, { 这样的方式去扩展 })
 */
import { Editor } from 'slate';
import NxSlatePlugin from '@jswork/next-slate-plugin';

export default NxSlatePlugin.define({
  id: 'ext-editor',
  statics: {
    version: '1.0.0',
    current: (inEditor) => {
      const selection = inEditor.selection;
      if (!selection) return null;
      const [node, _] = Editor.above(inEditor, selection.anchor.path);
      return node;
    }
  }
});
