import React from 'react';
import Titlebar from './components/Titlebar';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import './styles/index.scss';

const App: React.FC = () => {
  return (
    <>
      <Titlebar />
      <div id="app">
        <LeftPanel />
        <RightPanel />
      </div>
    </>
  );
};

export default App;
