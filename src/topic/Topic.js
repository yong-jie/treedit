class Topic {
  /**
   * @param {string} message
   * @param {number} id
   */
  constructor(message, id) {
    this.message = message;
    this.upvotes = 0;
    this.downvotes = 0;
    this.id = id;
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
   * @return {number} id
   */
  getId() {
    return this.id;
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
