export const createSet = <T = string>() => {
  return new Set<T>();
};

const stringSet = createSet<string>();
const numberSet = createSet<number>();
const unknownSet = createSet();
