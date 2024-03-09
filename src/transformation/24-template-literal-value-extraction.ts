type Names = [
  'Matt Pocock',
  'Jimi Hendrix',
  'Eric Clapton',
  'John Mayer',
  'BB King',
];

type GetSurname<T> = T extends `${string} ${infer Surname}` ? Surname : never;

export type T = GetSurname<Names[0]>;
