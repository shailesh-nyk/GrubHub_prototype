import React, { Component } from 'react';
import axios from 'axios';

class Calculator extends Component {
    constructor(props) {
       super(props);
       this.state = {
           displayValue : '0',
           operator: false,
           error: false,
           decimelLock: false
       }
    }
    render() {
      return (
       <div id='calculator'>
          <div className='display'>
              {this.state.displayValue}
          </div>
          <div className='row'>
              <button></button>
              <button onClick={() => this.actionClick('C')}>C</button>
              <button onClick={() => this.actionClick('CE')}>Back</button>
              <button onClick={() => this.operatorClick('/')}>/</button>
          </div>

          <div className='row'>
              <button onClick={() => this.numberClick('7')}>7</button>
              <button onClick={() => this.numberClick('8')}>8</button>
              <button onClick={() => this.numberClick('9')}>9</button>
              <button onClick={() => this.operatorClick('*')}>X</button>
          </div>

          <div className='row'>
              <button onClick={() => this.numberClick('4')}>4</button>
              <button onClick={() => this.numberClick('5')}>5</button>
              <button onClick={() => this.numberClick('6')}>6</button>
              <button onClick={() => this.operatorClick('-')}>-</button>
          </div>

          <div className='row'>
              <button onClick={() => this.numberClick('1')}>1</button>
              <button onClick={() => this.numberClick('2')}>2</button>
              <button onClick={() => this.numberClick('3')}>3</button>
              <button onClick={() => this.operatorClick('+')}>+</button>
          </div>

          <div className='row'>
              <button></button>
              <button  onClick={() => this.numberClick('0')}>0</button>
              <button onClick={() => this.operatorClick('.')}>.</button>
              <button  onClick={() => this.actionClick('=')}>=</button>
          </div>
        </div>
      );
    }

    numberClick(num) {
       if(this.state.error) return;
       if(this.state.displayValue === '0') {
           this.setState({
               displayValue: num,
               operator: false
           })
        } else {
            this.setState({
                displayValue: this.state.displayValue + num,
                operator: false
            }) 
       }
    }
    operatorClick(operator) {
        if(this.state.error) return;
        if(operator === '.' && this.state.decimelLock) return;
        if(!this.state.operator) {
            this.setState({
                displayValue: this.state.displayValue + operator,
                operator: true,
                decimelLock: operator === '.' ? true : false
            })
        }
    }
    actionClick(action) {
       switch(action) {
           case 'CE' : {
               if(this.state.error|| this.state.displayValue === '0') break;
               let str = this.state.displayValue.substring(0, this.state.displayValue.length - 1);
               this.setState({
                    displayValue: str === '' ? '0' : str,
                    operator: parseInt(str.slice(-1)) >= 0 ? false : true 
               });
               break;
           }
           case 'C' : {
               this.setState({
                   displayValue: '0',
                   operator: false,
                   error: false
               })
               break;
           }
           case '=': {
               if(this.state.error) break;
               this.calculate(this.state.displayValue);
               break;
           }
           default: break;
       }
    }

    calculate() {
        axios.post('http://localhost:3000/api/calculate', {
            expression: this.state.displayValue
        })
        .then(res => {
            if(res.status === 200) {
                if(res.data.result === null) {
                    this.setState({
                        displayValue : 'ERROR',
                        operator: false,
                        error: true
                    })
                } else {
                    this.setState({
                        displayValue : res.data.result.toString(),
                        operator: false,
                        error: false
                    })
                }
            } else {
                this.setState({
                    displayValue : 'ERROR',
                    operator: false,
                    error: true
                })
            }
        })
    }
   
}

export default Calculator