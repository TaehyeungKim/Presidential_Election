import React from 'react';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import MainPage from './pages/MainPage';
import UseMediaQuery from './customHooks/useMediaQuery'
import { specifyBrowser } from './utils/DetectBrowser';
import { useEffect } from 'react';

export const DeviceModeContext = React.createContext<boolean>(false)

function App() {

  const isDeviceMobile = UseMediaQuery('(max-width: 750px)');
  const isDeviceTablet = UseMediaQuery('(min-height: 1024px)');
  const isDeviceDesktop = !(isDeviceMobile || isDeviceTablet);

  useEffect(()=>{
    console.log(specifyBrowser())
  },[])

  return (
    <>
      <DeviceModeContext.Provider value={isDeviceDesktop}>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
      </Router>
      </DeviceModeContext.Provider>
    </>
  );
}

export default App;
