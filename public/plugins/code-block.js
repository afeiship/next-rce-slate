import React from 'react';
import { jsx } from 'slate-hyperscript';
import { Element } from 'slate';
import NxSlatePlugin from '@jswork/next-slate-plugin';

/**
 * @usage:
 * Transforms.setNodes(editor, { type:'codeblock' })
 */

const CodeBlock = NxSlatePlugin.define({
  id: 'codeblock',
  serialize: {
    input: ({ el, style }, children) => {
      const nodeName = el.nodeName.toLowerCase();
      const lang = el.getAttribute('data-language');
      if (nodeName === 'pre') {
        return jsx('element', { type: 'codeblock', lang }, children);
      }
    },
    output: ({ style, lang }, children) => {
      return `<pre data-lang='${lang}'><code>${children}</code></pre>`;
    }
  },
  commands: {
    is: function (editor, format) {
      const { selection } = editor;
      if (!selection) return false;

      const [match] = Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === format
      });

      return !!match;
    }
  },
  decorator: (editor) => {
    const { insertBreak } = editor;
    editor.insertBreak = () => {
      // return insertBreak(...args);
      const isType = CodeBlock.commands.is(editor, 'codeblock');
      const res = Editor.above(editor, {
        match: (n) => n.type === 'codeblock'
      });

      if (isType && res[0]) {
        var node = res[0];
        var target = node.children[0].text;
        if (target && target.endsWith('\n')) {
          editor.deleteBackward({ unit: 'line' });
          editor.insertNode({ type: 'paragraph', children: [{ text: '' }] });
        } else {
          editor.insertText('\n');
        }
      } else {
        insertBreak();
      }
    };
    return editor;
  },
  render: (_, { attributes, children, element }) => {
    return (
      <pre {...attributes}>
        <code>{children}</code>
      </pre>
    );
  }
});

export default CodeBlock;
