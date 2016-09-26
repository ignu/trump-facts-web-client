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
          <h1>Trump is a...</h1>
        </div>
        <p className="App-intro">
          <div>
            <h3>Donald Trump is a fascist who</h3>
            <ul>{ this.renderList(facts.data.fascist)}</ul>
          </div>

          <h3>Donald Trump is an idiot who believes</h3>

          <div>
            <ul>{ this.renderList(facts.data.crazy)}</ul>
          </div>

          <h3>Donald Trump is a liar who...</h3>

          <div>
            <ul>{ this.renderList(facts.data.crazy)}</ul>
          </div>
        <div>
      </div>
        </p>
      </div>
    );
  }
}

export default App;
