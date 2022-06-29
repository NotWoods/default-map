export class DefaultMap extends Map {
  constructor(defaultFactory, entries) {
    super(entries);
    this.defaultFactory = defaultFactory;
  }

  get(key) {
    if (!this.has(key)) {
      this.set(key, this.defaultFactory());
    }
    return super.get(key);
  }
}
