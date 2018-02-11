import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, ButtonGroup, Button } from 'reactstrap';
import './TopicList.css';

const TopicList = ({ topics, upvote, downvote }) => {
  const mappedTopics = topics.map(topic => (
    <ListGroupItem key={topic.id.toString()}>
      {topic.message}
      <div className="text-right top-margin">
        <ButtonGroup>
          <Button onClick={() => upvote(topic.id)}>Upvote</Button>
          {topic.score}
          <Button onClick={() => downvote(topic.id)}>Downvote</Button>
        </ButtonGroup>
      </div>
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
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};

export default TopicList;
