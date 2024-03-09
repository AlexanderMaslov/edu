export interface Example {
  name: string;
  age: number;
  id: string;
  organizationId: string;
  groupId: string;
}

type OnlyIdKeys<T> = {
  [K in keyof T as K extends `${string}${"id" | "Id"}${string}`
    ? K
    : never]: T[K];
};

type T = OnlyIdKeys<Example>;
