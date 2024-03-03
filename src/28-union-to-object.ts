type Route = '/' | '/about' | '/admin' | '/admin/users';

type RoutesObjects = {
  [R in Route]: R;
};
