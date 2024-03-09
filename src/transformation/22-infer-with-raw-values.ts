export type GetDataValue<T> = T extends { data: infer U } ? U : never;

type T = GetDataValue<{ data: 'hello' }>;
type T2 = GetDataValue<{ data: { name: 'hello' } }>;
type T3 = GetDataValue<{ data: { name: 'hello'; age: 20 } }>;
