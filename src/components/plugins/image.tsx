import React from 'react';
import { jsx } from 'slate-hyperscript';
import { Element } from 'slate';
import { useSelected, useFocused } from 'slate-react';

class ImageElement extends React.Component<any> {
  render() {
    const { attributes, children, element } = this.props;
    console.log('element.url', element.url);
    return (
      <span {...attributes}>
        <span contentEditable={false}>
          <img
            onClick={(e) => {
              console.log('click image~');
            }}
            src="https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg"
          />
        </span>
        {children}
      </span>
    );
  }
}

export default {
  name: 'image',
  hooks: {
    element: (inContext, inProps) => {
      const { element } = inProps;

      switch (element.type) {
        case 'image':
          return <ImageElement {...inProps} />;
      }
      // return null;
    }
  },
  decorator: (editor) => {
    const { isInline, isVoid } = editor;
    editor.isInline = (element) => {
      return element.type === 'image' ? true : isInline(element);
    };
    editor.isVoid = (element) => {
      return element.type === 'image' ? true : isVoid(element);
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
      console.log('image:', node, children);
      return `<img src="${node.url}" alt=""/>${children}`;
    }
  }
};

/**

const element = {
  type: 'image',
  url: 'https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
  children: [{ text: '' }]
};
Transforms.insertNodes(this.editor, element);
 */
