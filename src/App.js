import React, { Component } from 'react';
import './App.css';
import facts from 'trump-facts';
import R from 'ramda';

console.log('facts', facts);

class HtmlFact extends Component {
  render() {
    console.log('this.props', this.props);
    return(
      <span>
        <a href={this.props.url}>{this.props.title}</a>
        <span className="comma">, </span>
      </span>
    );
  }
}


class App extends Component {
  renderFacts() {
    return R.map((f) => <HtmlFact url={f.urls[0]} title={f.title}/>)(facts.data.crazy)
  }

  render() {


    return (
      <div className="App">
        <div className="App-header">
          <h1>Trump Facts</h1>
        </div>
        <p className="App-intro">
          <div>
            <span>Donald Trump believes </span>
            { this.renderFacts()}
          </div>
        </p>
      </div>
    );
  }
}

export default App;
