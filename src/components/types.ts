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
    value: any;
  };
}

export interface EventPluginTarget {
  target: {
    from: string;
    value: any;
  };
}

export type Props = {
  className?: string;
  value?: string;
  placeholder?: string;
  onInit?: (event: EventTarget) => void;
  onChange?: (event: EventTarget) => void;
  onPluginChange?: (event: EventPluginTarget) => void;
  plugins: Array<Entity>;
};
