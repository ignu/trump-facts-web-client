import React, { Component } from 'react';
import './App.css';
import facts from 'trump-facts';
import R from 'ramda';

let citationCount = 0;
let citations = [];

let Tags = {}
class HtmlFact extends Component {
  render() {
    let printCitations = (url) => {
      citationCount++
      citations.push(<li>[{citationCount}] {url}</li>);

      return <span> <a href={url} class="citation"><sup>[{citationCount}]</sup></a></span>
    }

    return(
      <li>
        <a href={this.props.url}>* {this.props.title}</a>
        {
          R.map(printCitations)(this.props.urls)
        }
      </li>
    );
  }
}

class BoardFact extends Component {
  render() {
    return(
        <div>
          * [url={this.props.url}]{this.props.title}[/url]
        </div>
    );
  }
}

        Tags = {
          HtmlFact,
          BoardFact,
        }

class App extends Component {
  constructor() {
    super()

    this.state = {
      format: "Html"
    }
  }

  renderList(data) {
    const first = R.init(data);
    const last = R.last(data);
    const Fact = Tags[this.state.format + "Fact"]
    let toHtml = (showComma) => {
      return (f) => <Fact showComma={showComma} urls={f.urls} url={f.urls[0]} title={f.title}/>;
    }
    let html = R.map(toHtml(true))(first);
    html.push(toHtml(false)(last));
    return html;
  }

  renderMessageBoard() {
    //let data = facts.data.crazy;

    //return R.map((f) => <BoardFact url={f.urls[0]} title={f.title}/>)(data);
  }

  changeType(type) {
    return () => {
      this.setState({ format: type})
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        <h1>Donald Trump is a <a href="#fascist">fascist</a> <a href="#idiot">idiot</a> <a href="#sexist">sexist</a> <a href="#liar">liar</a></h1>
        </div>
        <p className="App-intro">

          <button onClick={this.changeType("Text").bind(this)}>text</button>
          <button onClick={this.changeType("Html").bind(this)}>html</button>
          <button onClick={this.changeType("Markdown").bind(this)}>markdown</button>
          <button onClick={this.changeType("Board").bind(this)}>BBBoard</button>
        
          <div>
            <a name="fascist"></a>
            <h3>Donald Trump is a fascist who</h3>
            <ul>{ this.renderList(facts.data.fascist)}</ul>
          </div>

          <div>
            <a name="idiot"></a>
            <h3>Donald Trump is an idiot who believes</h3>
            <ul>{ this.renderList(facts.data.crazy)}</ul>
          </div>

          <div>
            <a name="liar"></a>
            <h3>Donald Trump is a liar who...</h3>
            <ul>{ this.renderList(facts.data.liar)}</ul>
          </div>

        <div>
          <a name="sexist"></a>
          <h3>Donald Trump is a sexist who...</h3>
          <ul>{ this.renderList(facts.data.sexist)}</ul>
        </div>

        <div>
        <ul>{citations}</ul>
      </div>
        </p>
      </div>
    );
  }
}

export default App;
