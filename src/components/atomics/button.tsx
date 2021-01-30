import React, { DetailedHTMLProps } from 'react';
import classNames from 'classnames';

type Props = DetailedHTMLProps<any, any> & {};

const CLASS_NAME = 'react-rte-slate__button';

export default class extends React.Component<Props> {
  public render() {
    const { active, className, tooltip, ...props } = this.props;
    return (
      <button
        aria-label={tooltip}
        data-balloon-pos="up"
        className={classNames({ 'is-active': active }, CLASS_NAME, className)}
        {...props}
      />
    );
  }
}
