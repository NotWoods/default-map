interface DefaultMap<K, V> extends Map<K, V> {
  /**
   * This attribute is initialized from the first argument to the constructor, if present, or to `undefined`, if absent.
   * `.get(key)` will throw an error if `.defaultFactory` is `undefined`.
   */
  defaultFactory: (() => V) | undefined;

  /**
   * Returns the `value` corresponding to `key`, or adds a new default value to the map using the `defaultFactory` function.
   */
  get(key: K): V;
}

interface DefaultMapConstructor {
  /**
   * Creates a new `DefaultMap`. Both arguments are optional.
   * @param defaultFactory a function that returns the default value for an entry. It takes no arguments.
   * @param entries an array or iterable of key-value pairs to initialize the map with.
   */
  new (): DefaultMap<any, any>;
  new <V>(defaultFactory?: () => V): DefaultMap<any, V>;
  new <K, V>(
    defaultFactory?: () => V,
    entries?: Iterable<readonly [K, V]> | null
  ): DefaultMap<K, V>;
  readonly prototype: DefaultMap<any, any>;
}
declare const DefaultMap: DefaultMapConstructor;

export { DefaultMap };
