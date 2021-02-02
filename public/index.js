import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactRteSlate from '../src/main';
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

  render() {
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-rte-slate">
        <ReactRteSlate
          placeholder="type your text."
          header={this.headerView}
          value={``}
          className="mb-5"
        />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
