import type { Reducer } from 'redux';
import * as actions from './actionTypes';

interface Bug {
  id: number;
  description: string;
  resolved: boolean;
}

type State = Bug[];

export type Action =
  | {
      type: typeof actions.BUG_ADDED;
      payload: Pick<Bug, 'description'>;
    }
  | {
      type: typeof actions.BUG_REMOVED;
      payload: Pick<Bug, 'id'>;
    }
  | {
      type: typeof actions.BUG_RESOLVED;
      payload: Pick<Bug, 'id'>;
    };

let lastId = 0;

const reducer: Reducer<State, Action> = (state = [], action) => {
  switch (action.type) {
    case actions.BUG_ADDED: {
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    }
    case actions.BUG_REMOVED: {
      return state.filter((bug) => bug.id !== action.payload?.id);
    }
    case actions.BUG_RESOLVED: {
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true },
      );
    }
    default:
      return state;
  }
};

export default reducer;
