import React, { Component } from 'react';
import TopicList from './Topic/TopicList';
import { fetchTopics } from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
  }

  componentDidMount() {
    this.retrieveTopics(1);
  }

  retrieveTopics(page) {
    fetchTopics(page)
      .then(response => this.setState({
        topics: response.body.result,
      }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <p>Header</p>
        </header>
        <TopicList topics={this.state.topics} />
      </div>
    );
  }
}

export default App;
