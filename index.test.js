// @ts-check
import test from "ava";
import { DefaultMap } from "./index.js";

test("basic", (t) => {
  /** @type {DefaultMap<number, number[]>} */
  const d1 = new DefaultMap();
  t.is(d1.defaultFactory, undefined);
  d1.defaultFactory = () => [];
  d1.get(12).push(42);
  t.deepEqual(Object.fromEntries(d1), { 12: [42] });
  d1.get(12).push(24);
  t.deepEqual(Object.fromEntries(d1), { 12: [42, 24] });
  d1.get(13);
  d1.get(14);
  t.deepEqual(Object.fromEntries(d1), { 12: [42, 24], 13: [], 14: [] });
  t.true(d1.get(12) !== d1.get(13));
  t.true(d1.get(13) !== d1.get(14));
  t.true(d1.get(12) !== d1.get(14));

  /** @type {() => any} */
  const list = () => [];
  /** @type {DefaultMap<any, any>} */
  const d2 = new DefaultMap(
    list,
    new Map([
      ["foo", 1],
      ["bar", 2],
    ])
  );
  t.is(d2.defaultFactory, list);
  t.deepEqual(Object.fromEntries(d2), { foo: 1, bar: 2 });
  t.is(d2.get("foo"), 1);
  t.is(d2.get("bar"), 2);
  t.deepEqual(d2.get(42), []);
  t.true(d2.has("foo"));
  t.true(d2.has("bar"));
  t.true(d2.has(42));
  t.deepEqual(Array.from(d2.keys()), ["foo", "bar", 42]);
  t.false(d2.has(12));
  d2.defaultFactory = undefined;
  t.throws(() => d2.get(15));
});
