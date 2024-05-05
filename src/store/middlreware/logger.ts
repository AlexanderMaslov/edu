import { Store } from '../configureStore';

// @ts-expect-error
const logger = (param) => (store: Store) => (next) => (action) => {
  console.log('param: ', param);
  next(action);
};

// @ts-expect-error
export default logger;
