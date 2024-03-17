function youSayGoodbyeISayHello<TGreeting extends 'hello' | 'goodbye'>(
  greeting: TGreeting,
): TGreeting extends 'goodbye' ? 'hello' : 'goodbye' {
  return (greeting === 'goodbye' ? 'hello' : 'goodbye') as s;
}

const result = youSayGoodbyeISayHello('hello');
const result2 = youSayGoodbyeISayHello('goodbye');
