import React from 'react';
import PropTypes from 'prop-types';

const TopicList = ({ topics }) => {
  const mappedTopics = topics.map(topic => (
    <li key={topic.id.toString()}>
      {topic.message}
    </li>
  ));
  return (
    <ul>
      {mappedTopics}
    </ul>
  );
};

TopicList.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TopicList;
