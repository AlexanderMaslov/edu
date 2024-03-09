interface Attributes {
  id: string;
  email: string;
  username: string;
}

type MutuallyExclusive<T> = {
  [K in keyof T]: Record<K, T[K]>;
}[keyof T];

export type T = MutuallyExclusive<Attributes>;
