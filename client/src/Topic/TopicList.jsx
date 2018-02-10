import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import './TopicList.css';

const TopicList = ({ topics }) => {
  const mappedTopics = topics.map(topic => (
    <ListGroupItem key={topic.id.toString()}>
      {topic.message}
    </ListGroupItem>
  ));
  return (
    <ListGroup>
      {mappedTopics}
    </ListGroup>
  );
};

TopicList.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TopicList;
