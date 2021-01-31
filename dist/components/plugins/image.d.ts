/// <reference types="react" />
import { Element } from 'slate';
declare const _default: {
    name: string;
    hooks: {
        element: (inContext: any, inProps: any) => JSX.Element | undefined;
    };
    decorator: (editor: any) => any;
    importer: (el: any, children: any) => Element | undefined;
    exporter: (node: any, children: any) => string | undefined;
};
export default _default;
/**

const element = {
  type: 'image',
  url: 'https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg',
  children: [{ text: '' }]
};
Transforms.insertNodes(this.editor, element);
 */
