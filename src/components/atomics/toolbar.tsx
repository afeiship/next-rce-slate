import React, { DetailedHTMLProps } from 'react';

type Props = DetailedHTMLProps & {};

const CLASS_NAME = 'react-rte-slate__toolbar';

export default class extends React.Component<Props> {
  public render() {
    const { children } = this.props;
    return <nav className={CLASS_NAME}>
      {children}
    </nav>
  }
}
