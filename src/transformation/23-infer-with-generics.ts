export interface MyComplexInterface<Event, Context, Name, Point> {
  getEvent: () => Event;
  getContext: () => Context;
  getName: () => Name;
  getPoint: () => Point;
}

type GetPoint<T> = T extends MyComplexInterface<
  infer TEvent,
  infer TContext,
  infer TName,
  infer TPoint
>
  ? TPoint
  : never;

type T = GetPoint<MyComplexInterface<1, 2, 3, 4>>;
