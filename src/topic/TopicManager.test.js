import TopicManager from './TopicManager';

describe('TopicManager', () => {
  const topicManager = new TopicManager();

  it('should initialize properly', () => {
    expect(topicManager.listTopics(20, 1)).toEqual([]);
  });

  it('should store the message in created topic correctly', () => {
    topicManager.createTopic('Hello!');
    expect(topicManager.listTopics(20, 1)[0].message).toBe('Hello!');
  });

  it('should strictly get a list of 20 items even if it has more', () => {
    let i = 0;
    while (i < 24) {
      i += 1;
      topicManager.createTopic('');
    }
    const retrievedTopics = topicManager.listTopics(20, 1);
    expect(retrievedTopics.length).toBe(20);
    i = 0;
    while (i < 20) {
      expect(retrievedTopics[i].id).toBe(i + 1);
      i += 1;
    }
  });

  it('should give a list of 25 items even if asked for more', () => {
    expect(topicManager.listTopics(50, 1).length).toBe(25);
  });

  it('should push first topic to the back after downvote', () => {
    topicManager.downvoteTopic(1);
    let retrievedTopics = topicManager.listTopics(20, 1);
    const filteredTopics = retrievedTopics.filter(topic => topic.id === 1);
    expect(filteredTopics.length).toBe(0);
    retrievedTopics = topicManager.listTopics(20, 2);
    expect(retrievedTopics[4].id).toBe(1);
  });

  it('should push last topic to the front after upvote', () => {
    topicManager.upvoteTopic(25);
    expect(topicManager.listTopics(20, 1)[0].id).toBe(25);
    expect(topicManager.listTopics(20, 2)[4].id).toBe(1);
  });

  it('should push 24th topic to the second position after upvote', () => {
    topicManager.upvoteTopic(24);
    expect(topicManager.listTopics(20, 1)[1].id).toBe(24);
  });

  it('should push 24th topic to the first position after upvote', () => {
    topicManager.upvoteTopic(24);
    expect(topicManager.listTopics(20, 1)[0].id).toBe(24);
  });

  it('should create new topic at the second last position', () => {
    topicManager.createTopic('');
    expect(topicManager.listTopics(20, 2)[4].id).toBe(26);
  });
});
