import { Router } from 'express';

import TopicManager from '../topic/TopicManager';
import { success } from './resultWrapper';

const routes = Router();
const topicManager = new TopicManager();

const NUMBER_OF_TOPICS_PER_PAGE = 20;

/**
 * GET /topic/list/:page list of topics in specified page number.
 */
routes.get('/topic/list/:page', (req, res) => {
  const { page } = req.params;
  const retrievedTopics = topicManager.listTopics(
    NUMBER_OF_TOPICS_PER_PAGE,
    parseInt(page, 10),
  );
  res.json(success(retrievedTopics));
});

/**
 * POST /topic/create create a new topic with given message
 */
routes.post('/topic/create', (req, res) => {
  const { message, page } = req.body.data;
  const requestedPage = parseInt(page, 10) || 1;
  if (message.length > 255) {
    return res.json(error('Message should be no longer than 255 characters!'));
  }
  topicManager.createTopic(message);
  const retrievedTopics = topicManager.listTopics(
    NUMBER_OF_TOPICS_PER_PAGE,
    requestedPage,
  );
  res.json(success(retrievedTopics));
});

/**
 * POST /topic/upvote upvote topic of given id
 */
routes.post('/topic/upvote', (req, res) => {
  const { id, page } = req.body.data;
  const requestedPage = parseInt(page, 10) || 1;
  topicManager.upvoteTopic(parseInt(id, 10));
  const retrievedTopics = topicManager.listTopics(
    NUMBER_OF_TOPICS_PER_PAGE,
    requestedPage,
  );
  res.json(success(retrievedTopics));
});

/**
 * POST /topic/downvote downvote topic of given id
 */
routes.post('/topic/downvote', (req, res) => {
  const { id, page } = req.body.data;
  const requestedPage = parseInt(page, 10) || 1;
  topicManager.downvoteTopic(parseInt(id, 10));
  const retrievedTopics = topicManager.listTopics(
    NUMBER_OF_TOPICS_PER_PAGE,
    requestedPage,
  );
  res.json(success(retrievedTopics));
});

export default routes;
