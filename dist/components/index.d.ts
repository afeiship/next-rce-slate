import PropTypes from 'prop-types';
import { Component } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { Props } from './types';
export default class ReactRteSlate extends Component<Props, any> {
    static displayName: string;
    static version: string;
    static propTypes: {
        /**
         * The extended className for component.
         */
        className: PropTypes.Requireable<string>;
        /**
         * Default value.
         */
        value: PropTypes.Requireable<string>;
        /**
         * The change handler.
         */
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * The plugin changed handler.
         */
        onPluginChange: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * The hanlder when editor init.
         */
        onInit: PropTypes.Requireable<(...args: any[]) => any>;
        /**
         * Plugin list.
         */
        plugins: PropTypes.Requireable<any[]>;
    };
    static defaultProps: {
        value: string;
        onChange: any;
        onPluginChange: any;
        onInit: any;
        plugins: never[];
    };
    private editor;
    private initialValue;
    private get withDecorators();
    private get hooks();
    private renderHooks;
    private toSlateNodes;
    constructor(inProps: any);
    renderElement: (inProps: RenderElementProps) => any;
    renderLeaf: (inProps: RenderLeafProps) => any;
    handleSerialize(inRole: any, inValue: any): any;
    handleChange: (inEvent: any) => void;
    render(): JSX.Element;
}
