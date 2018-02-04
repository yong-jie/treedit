import UidGenerator from './UidGenerator';

describe('UidGenerator', () => {
  const uidGenerator = new UidGenerator();

  it('should generate Uids in accordance to the incremental scheme', () => {
    let i = 1;
    while (i < 100) {
      const id = uidGenerator.requestUid();
      expect(id).toBe(i);
      i += 1;
    }
  });
});
