import React, { Component } from 'react';
import TopicList from './Topic/TopicList';
import TopicSubmission from './Topic/TopicSubmission';
import { fetchTopics, createTopic } from './api';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      topics: [],
      currentPage: 1,
    };
    this.makeTopic = this.makeTopic.bind(this);
  }

  componentDidMount() {
    this.retrieveTopics(this.state.currentPage);
  }

  retrieveTopics(page) {
    fetchTopics(page)
      .then(response => this.setState({
        topics: response.body.result,
      }));
  }

  makeTopic(message) {
    createTopic(message, this.state.currentPage)
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
        <TopicSubmission makeTopic={this.makeTopic} />
      </div>
    );
  }
}

export default App;
