import PropTypes from 'prop-types';
import { Component } from 'react';
export declare type Props = {
    className: string;
    value: object;
    onChange: Function;
};
export default class ReactRteSlate extends Component<Props> {
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
        value: PropTypes.Requireable<object>;
        /**
         * The change handler.
         */
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        value: null;
        onChange: any;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
