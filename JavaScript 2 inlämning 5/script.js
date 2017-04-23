var React = require('react');
var ReactDOM = require('react-dom');


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: ''
		};
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}
	handleKeyUp(event) {
		console.log('handleKeyUp');
		this.setState({
			msg: event.target.value
		});
	}
	render() {
		return (
		  <div className="myform">
		  <h2>* 1st part</h2>
			<MyForm handleKeyUp={this.handleKeyUp} msg={this.state.msg} />
		  </div>
		);
	}
}

function MyForm(props) {
	return <div>
    	<input type="text" onKeyUp={props.handleKeyUp} /> <br/>
    	<span>{props.msg}</span>
    </div>;
}

ReactDOM.render(
  <App></App>,
  document.getElementById('app-root')
)

