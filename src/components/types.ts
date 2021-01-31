import { Editor } from 'slate';

export interface Entity {
  name: string;
  disabled?: boolean;
  decorator?: (editor: Editor) => Editor;
  importer?: any;
  exporter?: any;
  hooks?: {
    leaf: (context: any, editor: Editor) => JSX.Element | null;
    element: (context: any, editor: Editor) => JSX.Element | null;
  };
}

export interface EventTarget {
  target: {
    value: string;
  };
}

export type Props = {
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: EventTarget) => void;
  plugins: Array<Entity>;
};
