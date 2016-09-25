import React, { Component } from 'react';
import './App.css';
import facts from 'trump-facts';
import R from 'ramda';

class HtmlFact extends Component {
  render() {
    return(
      <li>
        <a href={this.props.url}>{this.props.title}</a>
      </li>
    );
  }
}

class BoardFact extends Component {
  render() {
    return(
        <span>
          [url={this.props.url}]{this.props.title}[/url]
          { this.props.showComma && <span className="comma">, </span> }
        </span>
    );
  }
}

class App extends Component {
  renderList(data) {
    const first = R.init(data);
    const last = R.last(data);
    console.log('first', first);
    console.log('last', last);
    let toHtml = (showComma) => {
      return (f) => <HtmlFact showComma={showComma} url={f.urls[0]} title={f.title}/>;
    }
    let html = R.map(toHtml(true))(first);
    html.push(toHtml(false)(last));
    return html;
  }

  renderMessageBoard() {
    //let data = facts.data.crazy;

    //return R.map((f) => <BoardFact url={f.urls[0]} title={f.title}/>)(data);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Trump Facts</h1>
        </div>
        <p className="App-intro">
          <h3>Donald Trump is literally insanse</h3>
          <div>
            <span>Donald Trump is an idiot who believes </span>
            <ul>{ this.renderList(facts.data.crazy)}</ul>
          </div>

          <div>
            <h3>Donald Trump is a literal fascist</h3>
            <span>Donald Trump is a madman who </span>
            <ul>{ this.renderList(facts.data.fascist)}</ul>
          </div>
        <div>
      </div>
        </p>
      </div>
    );
  }
}

export default App;
