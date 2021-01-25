import React from 'react';
import { jsx } from 'slate-hyperscript';

export const withImage = (editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = (element) => {
    return element.type === 'image' || isInline(element);
  };
  editor.isVoid = (element) => {
    return element.type === 'image' || isVoid(element);
  };
  return editor;
};

export const ImageElement = class extends React.Component<any> {
  render() {
    const { attributes, children, element } = this.props;
    return (
      <span {...attributes}>
        <img
          onClick={(e) => {
            console.log('click image');
          }}
          contentEditable={false}
          src="https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg"
        />
        {children}
      </span>
    );
  }
};

export default {
  name: 'image',
  hooks: {},
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
  component: ImageElement,
  importer: {
    iife: 'image',
    condition: (el, children) => {
      return jsx(
        'element',
        {
          type: 'image',
          url: el.getAttribute('src')
        },
        children
      );
    }
  },
  exporter: {
    iife: 'latex',
    condition: (node, children) => {
      return `<img src="${node.url}" />${children}`;
    }
  }
};
