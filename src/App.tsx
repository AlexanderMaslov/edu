import './App.css';
import store from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

store.dispatch(bugAdded('bug1'));
store.dispatch(bugAdded('bug2'));
store.dispatch(bugAdded('bug3'));
store.dispatch(bugResolved(1));

console.log('store...', JSON.stringify(store.getState(), null, 2));

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
