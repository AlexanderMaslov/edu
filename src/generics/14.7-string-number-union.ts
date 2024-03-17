export const inferItemLiteral = <T extends string | number>(t: T) => {
  return { output: t };
};

const result1 = inferItemLiteral('a');
const result2 = inferItemLiteral(123);

type T1 = typeof result1;
type T2 = typeof result2;
