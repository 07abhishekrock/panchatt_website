import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import TrainAssembly from './components/Train';
import {MediaIntroBar, MediaContainer} from './components/MediaBar';
import {CurrentMediaWindow,ResizeStackContext} from './utlities/Contexts';


function App() {
  let [window_index, set_window_index] = useState(1);
  let [resize_function_stack, set_resize_function_stack] = useState([()=>{console.log('hello')}]);
  return(
    <React.Fragment>
    <ResizeStackContext.Provider value={[resize_function_stack,set_resize_function_stack]}>
      <CurrentMediaWindow.Provider value={[window_index, set_window_index]}>
        <NavBar/>
        <TrainAssembly/>
        <MediaIntroBar/>
        <MediaContainer/>
      </CurrentMediaWindow.Provider>
    </ResizeStackContext.Provider>
    </React.Fragment>
  );
}

export default App;
