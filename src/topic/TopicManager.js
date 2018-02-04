import Topic from './Topic';
import UidGenerator from '../uniqueness/UidGenerator';

class TopicManager {
  constructor() {
    this.topics = [];
    this.lookup = {};
    this.uidGenerator = new UidGenerator();
  }

  /**
   * @param {number} n - The number of topics per page.
   * @param {number} page - The page number to return.
   */
  listTopics(n, page) {
    // TODO: Speed this method up. Currently using naive approach.
    const retrievedTopics = this.topics.slice((page - 1) * n, page * n);
    return retrievedTopics.map(topic => ({
      id: topic.getId(),
      message: topic.getMessage(),
      score: topic.getScore(),
    }));
  }

  /**
   * @param {string} message
   */
  createTopic(message) {
    const uid = this.uidGenerator.requestUid();
    const topic = new Topic(message, uid);
    // TODO: Consider refactoring below two lines to just:
    // this.lookup[uid] = this.topics.push(topic) - 1;
    const indexOfTopic = this.topics.push(topic) - 1;
    this.lookup[uid] = indexOfTopic;
    this.singleBubbleSort(-1, indexOfTopic);
  }

  /**
   * @param {number} id
   */
  upvoteTopic(id) {
    const indexOfTopic = this.lookup[id];
    this.topics[indexOfTopic].upvote();
    this.singleBubbleSort(-1, indexOfTopic);
  }

  /**
   * @param {number} id
   */
  downvoteTopic(id) {
    const indexOfTopic = this.lookup[id];
    this.topics[indexOfTopic].downvote();
    this.singleBubbleSort(1, indexOfTopic);
  }

  /**
   * A contextualized bubble sort implementation where only one bubble is ever
   * needed to completely sort an array, resulting in an O(n) complexity.
   * The inclusion of a direction parameter allows for code reuse between upvote
   * and downvote methods.
   *
   * @param {number} direction - Direction to 'bubble'. Accepts either 1 or -1.
   * @param {number} start - The index to start bubbling from.
   */
  singleBubbleSort(direction, start) {
    let currentIndex = start;
    const endPoint = direction === 1 ? this.topics.length - 1 : 0;
    while (currentIndex !== endPoint) {
      const currentTopic = this.topics[currentIndex];
      const nextTopic = this.topics[currentIndex + direction];
      if ((direction === 1 && currentTopic.getScore() < nextTopic.getScore())
      || (direction === -1 && currentTopic.getScore() > nextTopic.getScore())) {
        // Conduct the swap
        this.topics[currentIndex] = nextTopic;
        this.topics[currentIndex + direction] = currentTopic;
        this.lookup[currentTopic.getId()] = currentIndex + direction;
        this.lookup[nextTopic.getId()] = currentIndex;
      } else {
        // If there was no need to swap, then the whole array is sorted.
        break;
      }
      currentIndex += direction;
    }
  }
}

export default TopicManager;
