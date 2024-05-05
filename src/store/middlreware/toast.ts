import { Store } from '../configureStore';

// @ts-expect-error
const toast = (store: Store) => (next) => (action) => {
  if (action.type === 'error') console.log('toasify', action.payload.message);
  else next(action);
};

export default toast;
