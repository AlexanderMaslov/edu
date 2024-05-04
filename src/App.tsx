import './App.css';
import makeStore from '@/store/configureStore';
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getBugsByUser,
} from '@/store/bugs';
import { projectAdded } from '@/store/projects';
import { userAdded } from '@/store/users';

const store = makeStore();

store.dispatch(bugAdded({ description: 'bug1' }));
store.dispatch(bugAdded({ description: 'bug2' }));
store.dispatch(bugAdded({ description: 'bug3' }));
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(projectAdded({ name: 'project1' }));
store.dispatch(userAdded({ name: 'user1' }));
store.dispatch(userAdded({ name: 'user2' }));

console.log(getBugsByUser(1)(store.getState()));

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
