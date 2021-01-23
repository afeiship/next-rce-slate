import React, { DetailedHTMLProps } from 'react';
import classNames from 'classnames';

type Props = DetailedHTMLProps & {};

const CLASS_NAME = 'react-rte-slate__button';

export default class extends React.Component<Props> {
  public render() {
    const { active, className, ...props } = this.props;
    return <button className={classNames({ 'is-active': active }, CLASS_NAME, className)} {...props} />
  }
}
