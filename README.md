# @notwoods/default-map

> A [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) subclass that **automatically** adds missing values

```js
import { DefaultMap } from "@notwoods/default-map";

const map = new DefaultMap(() => []);
map.get("key").push("array-item");
```

Includes [TypeScript](index.d.ts) support and default arguments in just 281 bytes!

Inspired by Python's [`defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict).

## Install

```sh
npm install @notwoods/default-map
```

## Usage

Using arrays with the `defaultFactory`, it is easy to group a sequence of key-value pairs into a map of arrays:

```js
import { DefaultMap } from "@notwoods/default-map";

const pairs = [
  { key: "yellow", value: 1 },
  { key: "blue", value: 2 },
  { key: "yellow", value: 3 },
  { key: "blue", value: 4 },
  { key: "red", value: 1 },
];
const map = new DefaultMap(() => []);
for (const { key, value } of pairs) {
  map.get(key).push(value);
}

Object.fromEntries(map);
// { blue: [2, 4], red: [1], yellow: [1, 3] }
```

When each key is encountered for the first time, it is not already in the mapping; so an entry is automatically created using the `defaultFactory` function which returns an empty array. The `array.push()` operation then attaches the value to the new array. When keys are encountered again, the look-up proceeds normally (returning the array for that key) and the `array.push()` operation adds another value to the array. This technique is simpler than an equivalent technique using a `Map`:

```js
const map = new Map();
for (const { key, value } of pairs) {
  if (map.has(key)) {
    const array = map.get(key);
    array.push(value);
  } else {
    map.set(key, [value]);
  }
}
```

Setting the `defaultFactory` to return an int makes the `DefaultMap` useful for counting (like a bag or multiset in other languages):

```js
import { DefaultMap } from "@notwoods/default-map";

const string = "mississippi";
const map = new DefaultMap(() => 0);
for (const char of string) {
  map.get(char) += 1;
}

Object.fromEntries(map);
// { m: 1, i: 4, p: 2, s: 4 }
```

When a letter is first encountered, it is missing from the mapping, so the `defaultFactory` function supplies a default count of zero. The increment operation then builds up the count for each letter.

Setting the `defaultFactory` to return a `Set` makes the `DefaultMap` useful for building a dictionary of sets:

```js
import { DefaultMap } from "@notwoods/default-map";

const pairs = [
  { key: "red", value: 1 },
  { key: "blue", value: 2 },
  { key: "red", value: 3 },
  { key: "blue", value: 4 },
  { key: "red", value: 1 },
  { key: "blue", value: 4 },
];
const map = new DefaultMap(() => new Set());
for (const { key, value } of pairs) {
  map.get(key).add(value);
}

Object.fromEntries(map);
// { blue: Set([2, 4]), red: Set([1, 3]) }
```

## API

Most functions are the same as a regular [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

### new DefaultMap(defaultFactory, entries)

Creates a new `DefaultMap`. Both arguments are optional.

- `defaultFactory`: a function that returns the default value for an entry. It takes no arguments.
- `entries`: an array or iterable of key-value pairs to initialize the map with.

### .get(key)

Returns the `value` corresponding to `key`, or adds a new default value to the map using the `defaultFactory` function.

### .defaultFactory

This attribute is initialized from the first argument to the constructor, if present, or to `undefined`, if absent. `.get(key)` will throw an error if `.defaultFactory` is `undefined`.

## Maintainers

- [Tiger Oakes](https://github.com/notwoods)
