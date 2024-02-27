type YouSayGoodbyeAndISayHello<T> = T extends 'hello' ? 'goodbye' : 'hello';

type Goodbye = YouSayGoodbyeAndISayHello<'hello'>;
type Hello = YouSayGoodbyeAndISayHello<'goodbye'>;
