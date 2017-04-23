
var React = require('react');
var ReactDOM = require('react-dom');

let numList = [
	{
		num1: 11,
		num2: 89
	}
];

class addApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number1: 0,
			num2: 0,
			total:0
		};
		this.formInputnum1KeyUp = this.formInputnum1KeyUp.bind(this);
		this.formInputnum2KeyUp = this.formInputnum2KeyUp.bind(this);
		
	}
	
	formInputnum1KeyUp(event) {
		this.setState({
			number1: Number(event.target.value)
		})
	}
	formInputnum2KeyUp(event) {
		this.setState({
			num2: Number(event.target.value)
		})
	}
	
	
	render() {
		let numList1 = numList[0];
		
		return (
			<div>
			<Info item={ {num1: this.state.number1, num2: this.state.num2 } } />
			<Form 
				handlenum1KeyUp={this.formInputnum1KeyUp}
				handlenum2KeyUp={this.formInputnum2KeyUp} />
			</div>
		);
	}
}
class Info extends React.Component {
  
	render() {
		let i = this.props.item;
		return <p>addition result :{i.num1+i.num2} </p>;
		 
	}
}
class Form extends React.Component {
	render() {
		return <p>
			<input type="number" 
				placeholder="place 1st number"
				onKeyUp={this.props.handlenum1KeyUp}/>
			<input type="number" 
				placeholder="place 2nd number"
				onKeyUp={this.props.handlenum2KeyUp}/>
			</p>;
	}
}

ReactDOM.render(
  <addApp />,
  document.getElementById('app-calc')
)
