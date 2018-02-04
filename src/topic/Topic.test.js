import Topic from './Topic';

describe('Topic', () => {
  const topic = new Topic('Hello!', 1);

  it('should initialize properly', () => {
    expect(topic.getDownvotes()).toBe(0);
    expect(topic.getUpvotes()).toBe(0);
    expect(topic.getMessage()).toBe('Hello!');
    expect(topic.getId()).toBe(1);
  });

  it('should upvote and downvote correctly', () => {
    topic.upvote();
    topic.downvote();
    expect(topic.getUpvotes()).toBe(1);
    expect(topic.getDownvotes()).toBe(1);
  });

  it('should display its score correctly', () => {
    topic.upvote(100);
    topic.downvote(50);
    expect(topic.getScore()).toBe(50);
    topic.downvote(100);
    expect(topic.getScore()).toBe(-50);
  });
});
