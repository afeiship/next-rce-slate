/// <reference types="react" />
import { Element } from 'slate';
declare const _default: {
    name: string;
    hooks: {
        element: (inContext: any, inProps: any) => JSX.Element | undefined;
    };
    decorator: (editor: any) => any;
    importer: (el: any, children: any) => Element | null | undefined;
    exporter: (node: any, children: any) => string | undefined;
};
export default _default;
/**

const element = {
  type: 'latex',
  value:'a^2+b^2',
  children: [{ text: '' }]
};
Transforms.insertNodes(this.editor, element);
 */
