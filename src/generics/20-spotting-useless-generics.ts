export const returnBothOfWhatIPassIn = <T extends { a: unknown; b: unknown }>(
  params: T
): [T["a"], T["b"]] => {
  return [params.a, params.b];
};

const result = returnBothOfWhatIPassIn({ a: "a", b: 1 });
