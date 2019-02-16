import './dev.scss';
import ReactRceSlate from './main';

/*===example start===*/

// install: npm install afeiship/react-rce-slate --save
// import : import ReactRceSlate from 'react-rce-slate'

class App extends React.Component{
  state = {

  };

  constructor(props){
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

  render(){
    return (
      <div className="hello-react-rce-slate">
        <ReactRceSlate ref='rc' />
      </div>
    );
  }
}
/*===example end===*/

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
