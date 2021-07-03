import React from 'react';

let CurrentMediaWindow = React.createContext();
let ResizeStackContext = React.createContext();

//all videos that are currently loaded
let VideoAllLoadedContext = React.createContext();

//current pane loading context --> describes which section is currently loading
let VideoLoadingIndex = React.createContext([-1 , ()=>{}]);
let BlogLoadingIndex = React.createContext([-1 , ()=>{}]);

//current video information
let CurrentPlayingVideoContext = React.createContext();

//current blog being displayed
let CurrentBlogContext = React.createContext();


let ModalContext = React.createContext();

export {
    CurrentMediaWindow, 
    VideoLoadingIndex,
    BlogLoadingIndex,
    ResizeStackContext, 
    VideoAllLoadedContext, 
    CurrentPlayingVideoContext,
    CurrentBlogContext, 
    ModalContext
};