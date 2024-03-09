type NonEmptyArray<T = string> = [T, ...T[]];

export const makeEnum = (value: NonEmptyArray) => {};

makeEnum(['a']);
makeEnum(['a', 'b', 'c']);

// @ts-expect-error
makeEnum([]);
