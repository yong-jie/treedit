import { Router } from 'express';
import TopicManager from '../topic/TopicManager';

const routes = Router();
const topicManager = new TopicManager();

/**
 * GET /topic/list/:page list of topics in specified page number.
 */
routes.get('/topic/list/:page', (req, res) => {
  const { page } = req.params;
  const retrievedTopics = topicManager.listTopics(20, parseInt(page, 10));
  res.json({ success: true, result: retrievedTopics });
});

/**
 * POST /topic/create create a new topic with given message
 */
routes.post('/topic/create', (req, res) => {
  const { message, page } = req.body;
  const requestedPage = parseInt(page, 10) || 1;
  topicManager.createTopic(message);
  const retrievedTopics = topicManager.listTopics(20, requestedPage);
  res.json({ success: true, result: retrievedTopics });
});

/**
 * POST /topic/upvote upvote topic of given id
 */
routes.post('/topic/upvote', (req, res) => {
  const { id, page } = req.body;
  const requestedPage = parseInt(page, 10) || 1;
  topicManager.upvoteTopic(parseInt(id, 10));
  const retrievedTopics = topicManager.listTopics(20, requestedPage);
  res.json({ success: true, result: retrievedTopics });
});

/**
 * POST /topic/downvote downvote topic of given id
 */
routes.post('/topic/downvote', (req, res) => {
  const { id, page } = req.body;
  const requestedPage = parseInt(page, 10) || 1;
  topicManager.downvoteTopic(parseInt(id, 10));
  const retrievedTopics = topicManager.listTopics(20, requestedPage);
  res.json({ success: true, result: retrievedTopics });
});

export default routes;
