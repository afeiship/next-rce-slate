# react-rte-slate
> Pure React rich text WYSIWYG editor based on slatejs.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-rte-slate
```

## properties
| Name      | Type   | Required | Default | Description                           |
| --------- | ------ | -------- | ------- | ------------------------------------- |
| className | string | false    | -       | The extended className for component. |
| value     | object | false    | null    | The changed value.                    |
| onChange  | func   | false    | noop    | The change handler.                   |


## usage
1. import css
  ```scss
  @import "~@jswork/react-rte-slate/dist/style.css";

  // or use sass
  @import "~@jswork/react-rte-slate/dist/style.scss";

  // customize your styles:
  $react-rte-slate-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactRteSlate from '@jswork/react-rte-slate';
  import './assets/style.scss';

  class App extends React.Component {
    render() {
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-rte-slate">
          <ReactRteSlate className="mb-5 has-text-white" />
          <button className="button is-primary is-fullwidth">Start~</button>
        </ReactDemokit>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-rte-slate/


## license
Code released under [the MIT license](https://github.com/afeiship/react-rte-slate/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-rte-slate
[version-url]: https://npmjs.org/package/@jswork/react-rte-slate

[license-image]: https://img.shields.io/npm/l/@jswork/react-rte-slate
[license-url]: https://github.com/afeiship/react-rte-slate/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-rte-slate
[size-url]: https://github.com/afeiship/react-rte-slate/blob/master/dist/react-rte-slate.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-rte-slate
[download-url]: https://www.npmjs.com/package/@jswork/react-rte-slate
