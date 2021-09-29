import React from 'react';
import '../css/style.less';

export default class App extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = { 
      balance: 0, 
      rate: 0, 
      term: 15,
      payment: 0,
    }; 
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  } 
  
  updateBalance(e) { 

  }
  handleChange(e) { 
    this.setState({ 
      [e.target.name]: e.target.value
    });
  }

  /**
   * Calculate the mortgage payment 
   * @param {*} balance 
   * @param {*} rate 
   * @param {*} term 
   * @returns 
   */
  calculate(balance, rate , term ) { 
    const n = term * 12;
    const r = rate / 100 / 12;
    var numerator = r * (1 + r) ** n;
    var denominator = (1 + r) ** n - 1;  
    return  parseFloat(balance * (numerator / denominator)).toFixed(2);
  }

  handleClick(e) { 
    e.preventDefault();
    const balance = this.state.balance;  
    const rate = this.state.rate; 
    const term = this.state.term; 

    const p = this.calculate(balance, rate, term);
    this.setState({payment:  p + ' is your monthly payment'});
  }
 
  render() {
    let styleobj = {fontSize: 24, color: 'green'}
    return (
      <div className='container'>
        <form className="form-horizontal">
        <div className='page-header p-3 mb-2 bg-success text-white'>
        <h3>Mortgage Calculator</h3>
        </div>
          <div className="form-group">
            <label htmlFor="balance" className="col-sm-2 control-label">Loan Balance</label>
            <div className="col-sm-10">
              <input
              name="balance"
              value={this.state.balance}
              onChange={this.handleChange}
              type="number" 
              className="form-control"    
              value={this.state.balance}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rate" className="col-sm-2 control-label">Interest Rate (%)</label>
            <div className="col-sm-10">
              <input 
              name="rate"
              value={this.state.rate}
              onChange={this.handleChange}
              type="number" 
              className="form-control" 
              name="rate"  
              step="0.01" 
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="term" className="col-sm-2 control-label">Choose a loan term</label>
            <select
             name="term" 
            id="term" 
            value={this.state.term} 
            onChange={this.handleChange}
            > 
              <option value ="--">--</option>
              <option value="15">15</option>
              <option value="30">30</option> 
            </select>
          </div>

          <div className="form-group center-block">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className='btn btn-success' 
              onClick={this.handleClick}
               name="submit" 
               className="btn btn-warning" >Calculate</button>
              <p id="output" style={styleobj} name="output">{this.state.payment}</p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
 

