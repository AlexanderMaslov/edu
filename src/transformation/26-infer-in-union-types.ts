const parser1 = {
  parse: () => 1,
};

const parser2 = () => '123';

const parser3 = {
  extract: () => true,
};

type GetParserResult<T> = T extends
  | { parse: () => infer R }
  | (() => infer R)
  | { extract: () => infer R }
  ? R
  : never;

type T1 = GetParserResult<typeof parser1>;
type T2 = GetParserResult<typeof parser2>;
type T3 = GetParserResult<typeof parser3>;
