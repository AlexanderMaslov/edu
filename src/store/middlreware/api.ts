import type { State } from '../configureStore';
import * as actions from '../api';

// @ts-ignore
const api =
  ({ dispatch }: State) =>
  // @ts-expect-error
  (next) =>
  // @ts-expect-error
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    next(action);

    const { url, onSuccess, onError } = action.payload;

    try {
      const response = await (await fetch(url)).json();
      dispatch(actions.apiCallSuccess(response));
      if (onSuccess) dispatch({ type: onSuccess, payload: response });
    } catch (error) {
      dispatch(actions.apiCallFailded(error));
      if (onError) dispatch({ type: onError, payload: error });
    }
  };

// @ts-ignore
export default api;
