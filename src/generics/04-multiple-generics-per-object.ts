const returnBothOfWhatIPassIn = <T1, T2>(params: { a: T1; b: T2 }) => ({
  first: params.a,
  second: params.b,
});

interface Params<T1, T2> {
  a: T1;
  b: T2;
}

const returnBothOfWhatIPassIn2 = <T1, T2>(params: Params<T1, T2>) => ({
  first: params.a,
  second: params.b,
});

const result1 = returnBothOfWhatIPassIn({ a: 'a', b: 1 });
const result2 = returnBothOfWhatIPassIn2({ a: 'a', b: 1 });
