/*jshint esnext: true, moz: true*/
/*jslint browser:true */
/*global firebase, React, ReactDOM */


var React = require('react');
var ReactDOM = require('react-dom');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			msg1: '',
			msg2: ''
		}
		this.handleKeyUp1 = this.handleKeyUp1.bind(this);
		this.handleKeyUp2 = this.handleKeyUp2.bind(this);
	}
	handleKeyUp1(event) {
		console.log('handleKeyUp1');
		this.setState({
			msg2: event.target.value
		})
	}
	handleKeyUp2(event) {
		console.log('handleKeyUp2');
		this.setState({
			msg1: event.target.value
		})
	}
	render() {
		return (
		  <div className="myform">
			<MyForm handleKeyUp={this.handleKeyUp1} msg={this.state.msg1} />
			<MyForm handleKeyUp={this.handleKeyUp2} msg={this.state.msg2} />
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
