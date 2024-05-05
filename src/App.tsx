import './App.css';
import { store } from '@/store/configureStore';
import { useEffect } from 'react';
import * as actions from './store/api';
import { loadBugs } from './store/bugs';

const App = () => {
  useEffect(() => {
    store.dispatch(loadBugs());
  }, []);

  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
