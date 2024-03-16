const typedObjectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

const typedObjectKeys2 = <K extends string>(obj: Record<K, any>) => {
  return Object.keys(obj) as Array<K>;
};

const result = typedObjectKeys({ a: 1, b: 2 });
const result2 = typedObjectKeys2({ a: 1, b: 2 });
