export type Route =
  | {
      route: '/';
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: '/about' }
  | { route: '/admin' }
  | { route: '/admin/urers' };

type RouteObject = {
  [R in Route as R['route']]: R extends { search: infer S } ? S : never;
};
