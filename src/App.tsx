import './App.css';
import configureStore from '@/store/configureStore';
import { bugAdded, bugResolved } from '@/store/bugs';

const store = configureStore();

store.dispatch(bugAdded('bug1'));
store.dispatch(bugAdded('bug2'));
store.dispatch(bugAdded('bug3'));
store.dispatch(bugResolved(1));

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
