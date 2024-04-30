import type { Action } from './reducer';
import * as actions from './actionTypes';

export const bugAdded = (description: string): Action => ({
  type: actions.BUG_ADDED,
  payload: { description },
});

export const bugRemoved = (id: number): Action => ({
  type: actions.BUG_REMOVED,
  payload: { id },
});

export const bugResolved = (id: number): Action => ({
  type: actions.BUG_RESOLVED,
  payload: { id },
});
