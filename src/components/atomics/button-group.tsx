import React, { DetailedHTMLProps } from 'react';
import classNames from 'classnames';

type Props = DetailedHTMLProps & {};

const CLASS_NAME = 'react-rte-slate__button-group';

export default class extends React.Component<Props> {
  public render() {
    const { className, ...props } = this.props;
    return <nav className={classNames(CLASS_NAME, className)} {...props} />;
  }
}
