
var React = require('react');
var ReactDOM = require('react-dom');

class TwoButtons extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
           classNameA:"buttonA",
           classNameB:"buttonA",    
           textDisplay: "",
           valueA: 0,
           valueB: 0 ,
           spanDisplay1: "none",
           spanDisplay2: "none"    
        };
        
        this.handleBttnA = this.handleBttnA.bind(this)
        this.handleBttnB = this.handleBttnB.bind(this)
    }
    
    handleBttnA (event) {
        this.setState({classNameA: "buttonB", classNameB: "buttonA"});
        this.setState({textDisplay: event.target.innerHTML});
        this.setState({valueA: this.state.valueA +1});
        this.setState({spanDisplay1: "inline"});
        this.setState({spanDisplay2: "none"});

    }
    handleBttnB (event) {
        this.setState({classNameB: "buttonB", classNameA: "buttonA"});
        this.setState({textDisplay: event.target.innerHTML});
        this.setState({valueB: this.state.valueB +1});
        this.setState({spanDisplay2: "inline"});
        this.setState({spanDisplay1: "none"});

    }
   
    render () {
        
        return (
          <div> 
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-3">
                    <button className={this.state.classNameA}
                            onClick={this.handleBttnA}>
                        clicked the right button
                    </button>    
                </div>
                <div className="col-sm-2">
                    <button className={this.state.classNameB}
                            onClick={this.handleBttnB}>
                        clicked the left button
                    </button> 
                </div>
                <div className="col-sm-4"></div>
            </div>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4" id="part3">
                    {this.state.textDisplay}
                    <span style={{display: this.state.spanDisplay1}}>
                        {this.state.valueA}
                    </span>
                    <span style={{display: this.state.spanDisplay2}}>
                        {this.state.valueB}
                    </span>
                </div>
                <div className="col-sm-4"></div>
            </div>    
        </div>        
        );
    }
}
 ReactDOM.render (
        <TwoButtons />,
        document.getElementById('button_App')
        );