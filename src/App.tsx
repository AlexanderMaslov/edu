import './App.css';
import makeStore from '@/store/configureStore';
import { bugAdded, bugResolved } from '@/store/bugs';
import { projectAdded } from '@/store/projects';

const store = makeStore();

store.dispatch(bugAdded({ description: 'bug1' }));
store.dispatch(bugAdded({ description: 'bug2' }));
store.dispatch(bugAdded({ description: 'bug3' }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(projectAdded({ name: 'project1' }));

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
