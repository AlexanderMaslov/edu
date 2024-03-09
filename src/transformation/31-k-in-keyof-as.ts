interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

export type AttributeGetters = {
  [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
};
