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

routes.post('/topic/create', (req, res) => {
  const { message } = req.body;
  topicManager.createTopic(message);
  const retrievedTopics = topicManager.listTopics(20, 1);
  res.json({ success: true, result: retrievedTopics });
});

export default routes;
