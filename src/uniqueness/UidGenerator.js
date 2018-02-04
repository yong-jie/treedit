class UidGenerator {
  constructor() {
    this.nextId = 0;
  }

  requestUid() {
    this.nextId += 1;
    return this.nextId;
  }
}

export default UidGenerator;
