type Fruit = 'apple' | 'banana' | 'orange';

export type AppleOrBanana<T> = T extends 'apple' | 'banana' ? T : never;

type T = AppleOrBanana<Fruit>;
