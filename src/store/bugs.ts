import type { Reducer } from 'redux';

const BUG_ADDED = 'BUG_ADDED';
const BUG_REMOVED = 'BUG_REMOVED';
const BUG_RESOLVED = 'BUG_RESOLVED';

export const bugAdded = (description: string): Action => ({
  type: BUG_ADDED,
  payload: { description },
});

export const bugRemoved = (id: number): Action => ({
  type: BUG_REMOVED,
  payload: { id },
});

export const bugResolved = (id: number): Action => ({
  type: BUG_RESOLVED,
  payload: { id },
});

interface Bug {
  id: number;
  description: string;
  resolved: boolean;
}

type State = Bug[];

export type Action =
  | {
      type: typeof BUG_ADDED;
      payload: Pick<Bug, 'description'>;
    }
  | {
      type: typeof BUG_REMOVED;
      payload: Pick<Bug, 'id'>;
    }
  | {
      type: typeof BUG_RESOLVED;
      payload: Pick<Bug, 'id'>;
    };

let lastId = 0;

const reducer: Reducer<State, Action> = (state = [], action) => {
  switch (action.type) {
    case BUG_ADDED: {
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    }
    case BUG_REMOVED: {
      return state.filter((bug) => bug.id !== action.payload?.id);
    }
    case BUG_RESOLVED: {
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true },
      );
    }
    default:
      return state;
  }
};

export default reducer;
