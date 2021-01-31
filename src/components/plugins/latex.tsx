import React from 'react';
import { Viewer } from '@jswork/keypad-quizizz';

import { Transforms, Element } from 'slate';
import { ReactEditor } from 'slate-react';
import { jsx } from 'slate-hyperscript';

class LatexElement extends React.Component<any> {
  constructor(inProps) {
    super(inProps);
    const { value } = inProps.element;
    this.state = { value };
  }

  handleLatexEdit = (inEvent) => {
    const { value } = inEvent.target.dataset;
    const { element, editor } = this.props;
    const pmt = window.prompt('edit?', value);
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { value: pmt }, { at: path });
    this.setState({ value: pmt || value });
  };

  render() {
    // const { value } = this.props.element;
    const value = this.state.value;
    const { attributes, element, children } = this.props;
    return (
      <span {...attributes}>
        <span contentEditable={false}>
          <Viewer
            value={value}
            data-value={value}
            onClick={this.handleLatexEdit}
          />
        </span>
        {children}
      </span>
    );
  }
};

export default {
  name: 'latex',
  hooks: {
    element: (inContext, inProps) => {
      const { element } = inProps;
      switch (element.type) {
        case 'latex':
          return <LatexElement editor={inContext.editor} {...inProps} />;
      }
      // return null;
    }
  },
  decorator: (editor) => {
    const { isInline, isVoid } = editor;
    editor.isInline = (element) => {
      return element.type === 'latex' || isInline(element);
    };
    return editor;
  },
  importer: (el, children) => {
    const nodeName = el.nodeName.toLowerCase();
    console.log(el, children);

    switch (nodeName) {
      case 'span':
        const value = el.getAttribute('data-latex');
        if (value) {
          return jsx('element', { type: 'latex', value }, [{ text: '' }]);
        }
        return null;
    }
  },
  exporter: (node, children) => {
    if (Element.isElement(node) && node.type === 'latex') {
      return `<span data-latex="${node.value}"></span>${children}`;
    }
  }
};

/**

const element = {
  type: 'latex',
  value:'a^2+b^2',
  children: [{ text: '' }]
};
Transforms.insertNodes(this.editor, element);
 */
