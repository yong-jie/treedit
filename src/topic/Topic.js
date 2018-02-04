class Topic {
  /**
   * @param {string} message
   */
  constructor(message) {
    this.message = message;
    this.upvotes = 0;
    this.downvotes = 0;
  }

  /**
   * @return {string} message
   */
  getMessage() {
    return this.message;
  }

  /**
   * @return {number} upvotes
   */
  getUpvotes() {
    return this.upvotes;
  }

  /**
   * @return {number} downvotes
   */
  getDownvotes() {
    return this.downvotes;
  }

  /**
   * @return {number} score
   */
  getScore() {
    return this.upvotes - this.downvotes;
  }

  /**
   * @param {number=} amount
   */
  upvote(amount = 1) {
    this.upvotes += amount;
  }

  /**
   * @param {number=} amount
   */
  downvote(amount = 1) {
    this.downvotes += amount;
  }
}

export default Topic;
