export type YouSayGoodbyeAndISayHello<T> = T extends 'hello' | 'goodbye'
  ? T extends 'hello'
    ? 'goodbye'
    : 'hello'
  : never;

type Goodbye = YouSayGoodbyeAndISayHello<'hello'>;
type Hello = YouSayGoodbyeAndISayHello<'goodbye'>;
type N = YouSayGoodbyeAndISayHello<'abc'>;
