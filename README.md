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
| Name           | Type   | Required | Default | Description                           |
| -------------- | ------ | -------- | ------- | ------------------------------------- |
| className      | string | false    | -       | The extended className for component. |
| value          | string | true     | -       | Runtime value.                        |
| header         | any    | false    | -       | Header for editor.                    |
| footer         | any    | false    | -       | Footer for editor.                    |
| onChange       | func   | false    | noop    | The change handler.                   |
| onPluginChange | func   | false    | noop    | The plugin changed handler.           |
| onInit         | func   | false    | noop    | The hanlder when editor init.         |
| plugins        | array  | false    | []      | Plugin list.                          |


## usage
1. import css
  ```scss
  @import "~@jswork/react-rte-slate/dist/style.css";

  // or use sass
  @import "~@jswork/react-rte-slate/dist/style.scss";
  @import "~@jswork/react-rte-ui/dist/style.scss";
  @import "~@jswork/wsui-rte-icons";

  // customize your styles:
  $react-rte-slate-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactRteSlate from '@jswork/react-rte-slate';
  import { Toolbar, ButtonGroup, Button } from '@jswork/react-rte-ui';
  import './assets/style.scss';

  class App extends React.Component {
    get headerView() {
      return (
        <Toolbar className="wsui-rte-icons">
          <ButtonGroup>
            <Button tooltip="左对齐">
              <i className="wsui-icon-align_left" />
            </Button>
            <Button tooltip="居中" active>
              <i className="wsui-icon-align_center" />
            </Button>
            <Button tooltip="右对齐">
              <i className="wsui-icon-align_right" />
            </Button>
            <Button tooltip="右对齐">
              <i className="wsui-icon-align_justify" />
            </Button>
          </ButtonGroup>
        </Toolbar>
      );
    }

    constructor(inProps) {
      super(inProps);
      this.state = { value: '<p>aaa</p>' };
    }

    handleClick1 = (e) => {
      this.setState({ value: '<p>abcd</p>' });
    };

    render() {
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-rte-slate">
          <button className="btn" onClick={this.handleClick1}>
            Update a value.
          </button>
          <ReactRteSlate
            placeholder="type your text."
            header={this.headerView}
            value={this.state.value}
            onChange={(e) => {
              this.setState({ value: e.target.value });
              console.log('html:', e.target.value);
            }}
            className="mb-5"
          />
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
