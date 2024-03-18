const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
  return obj[key];
};

export const obj = {
  a: 1,
  b: "some",
  c: true,
};

const numberResult = getValue(obj, "a");
const stringResult = getValue(obj, "b");
const booleanResult = getValue(obj, "c");
