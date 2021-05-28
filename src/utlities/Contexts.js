import React from 'react';

let CurrentMediaWindow = React.createContext();
let ResizeStackContext = React.createContext();

//all videos that are currently loaded
let VideoAllLoadedContext = React.createContext();

//current pane loading context --> describes which section is currently loading
let CurrentSectionLoadingIndex = React.createContext([-1 , ()=>{}]);

//current video information
let CurrentPlayingVideoContext = React.createContext();

export {
    CurrentMediaWindow, 
    CurrentSectionLoadingIndex,
    ResizeStackContext, 
    VideoAllLoadedContext, 
    CurrentPlayingVideoContext
};