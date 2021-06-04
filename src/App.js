import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import TrainAssembly from './components/Train';
import {MediaIntroBar, MediaContainer} from './components/MediaBar';
import {CurrentMediaWindow,ResizeStackContext,VideoLoadingIndex,BlogLoadingIndex} from './utlities/Contexts';
import FooterContainer from './components/FooterContainer';


function App() {
  let [window_index, set_window_index] = useState(1);
  let [video_load_index, set_video_load_index] = useState(-1);
  let [blog_load_index, set_blog_load_index] = useState(-1);
  let [resize_function_stack, set_resize_function_stack] = useState([()=>{console.log('hello')}]);
  return(
    <React.Fragment>
    <ResizeStackContext.Provider value={[resize_function_stack,set_resize_function_stack]}>
      <CurrentMediaWindow.Provider value={[window_index, set_window_index]}>
        <BlogLoadingIndex.Provider value={[blog_load_index , set_blog_load_index]}>
        <VideoLoadingIndex.Provider value={[video_load_index , set_video_load_index]}>
          <NavBar/>
          <TrainAssembly/>
          <MediaIntroBar/>
          <MediaContainer/>
          <FooterContainer/>
        </VideoLoadingIndex.Provider>
        </BlogLoadingIndex.Provider>
      </CurrentMediaWindow.Provider>
    </ResizeStackContext.Provider>
    </React.Fragment>
  );
}

export default App;
