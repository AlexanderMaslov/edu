type UserPath = '/users/:id';

type UserOrganizationPath = '/users/:id/organizations/:organizationId';

type ExtractPathParams<T> = {
  [K in T extends `${string}/:${infer P}` ? P : never]: string;
};

export type T1 = ExtractPathParams<UserPath>;
