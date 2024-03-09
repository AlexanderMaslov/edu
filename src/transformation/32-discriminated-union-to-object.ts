export type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | {
      route: "/about";
      search: {};
    }
  | {
      route: "/admin";
      search: {};
    }
  | { route: "/admin/users"; search: {} };

type RouteObject = {
  [R in Route["route"]]: Extract<Route, { route: R }>["search"];
};

type RouteObject2 = {
  [R in Route as R["route"]]: R["search"];
};
