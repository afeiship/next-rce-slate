import React from 'react';
import { jsx } from 'slate-hyperscript';
import { Element } from 'slate';

class ImageElement extends React.Component<any> {
  render() {
    const { attributes, children, element } = this.props;
    return (
      <span {...attributes} contentEditable={false}>
        <img
          onClick={(e) => {
            console.log('click image~');
          }}
          src="https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg"
        />
        {children}
      </span>
    );
  }
}

export default {
  name: 'image',
  hooks: {
    element: (inContext, { attributes, children, element }) => {
      switch (element.type) {
        case 'image':
          return <ImageElement {...attributes} />;
      }
      // return null;
    }
  },
  decorator: (editor) => {
    const { isInline, isVoid } = editor;
    editor.isInline = (element) => {
      return element.type === 'image' || isInline(element);
    };
    editor.isVoid = (element) => {
      return element.type === 'image' || isVoid(element);
    };
    return editor;
  },
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    switch (nodeName) {
      case 'image':
        const url = el.getAttribute('src');
        return jsx('element', { type: 'image', url }, children);
    }
  },
  exporter: (node, children) => {
    if (Element.isElement(node) && node.type === 'image') {
      return `<img src="${node.url}" alt=""/>${children}`;
    }
  }
};

/**

const text = { text: '' };
const image = {
  type: 'image',
  url: 'https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
  children: [text]
};
Transforms.insertNodes(this.editor, image);
 */
