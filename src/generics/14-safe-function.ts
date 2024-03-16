const makeSafe =
  <Params extends any[], Return>(func: (...args: Params) => Return) =>
  (
    ...args: Params
  ):
    | { type: "success"; result: Return }
    | { type: "failure"; error: Error } => {
    try {
      const result = func(...args);
      return {
        type: "success",
        result,
      };
    } catch (ex) {
      return {
        type: "failure",
        error: ex as Error,
      };
    }
  };
