import React from 'react';

let CurrentMediaWindow = React.createContext();
let ResizeStackContext = React.createContext();
let VideoAllLoadedContext = React.createContext();
let CurrentPlayingVideoContext = React.createContext();

export {CurrentMediaWindow, ResizeStackContext, VideoAllLoadedContext, CurrentPlayingVideoContext};