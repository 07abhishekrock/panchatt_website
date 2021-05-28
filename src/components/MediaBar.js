import React, {useEffect, useRef, useState, useContext} from 'react';
import '../stylesheets/MediaBar.css'
import '../stylesheets/BlogDisplay.css'
import '../stylesheets/VideoCarousel.css';
import {CurrentMediaWindow , CurrentSectionLoadingIndex} from '../utlities/Contexts';
import BlogsContainer  from './BlogContainer';
import VideoContainer from './VideoContainer';

function MediaIntroBar(props){
    let [select_index, set_select_index] = useContext(CurrentMediaWindow);
    let nav_element = useRef(null);
    let intersection_element = useRef(null);
    
    //the index of the currently loading section goes here
    let load_index = useContext(CurrentSectionLoadingIndex)[0];

    useEffect(()=>{
        let new_intersection_observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.target === intersection_element.current){
                    if(entry.boundingClientRect.top < 0 && !entry.isIntersecting)
                    {
                        //fixed on top
                        nav_element.current.classList.add('fixed-class');
                    }
                    else {
                        //revert back
                        nav_element.current.classList.remove('fixed-class');
                    }
                }
            })
        },{
            root:null,
            threshold:[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
        })
        new_intersection_observer.observe(intersection_element.current);
    },[])

    return(
        <div className="media-intro-bar" >
            <div>
                <div className="panchatt-icon"></div>
                <p>
                    Bringing you the <b>desi-videsi</b> blend of infotainment. 
                    <br/><br/>Find with us your interests like reading , listening and watching. 
                    <br/><br/>The <b>platform</b> to panchatt with us on raging trends and topics and becoming a voice of your own.
                </p>
            </div>
            <div className="intersection" ref={intersection_element}></div>
            <div ref={nav_element}>
                <div position = {Number(select_index)}>
                    <span 
                    select={select_index === 0 ? 1 : 0} 
                    load={load_index === 0 ? 1 : 0}
                    onClick={()=>{
                        set_select_index(0);
                    }}>Blogs</span>
                    <span 
                    select={select_index === 1 ? 1 : 0} 
                    load={load_index === 1 ? 1 : 0}
                    onClick={()=>{
                        set_select_index(1);
                    }}>Videos</span>
                </div>
                <button className="left top" disable = {select_index === 0 ? 1 : 0} onClick={()=>{
                    set_select_index((select_index - 1) % 2 >= 0 ? (select_index - 1) % 2 : 0);
                }}></button>
                <button className="right top" disable = {select_index === 2 ? 1 : 0} onClick={()=>{
                    set_select_index(select_index === 1 ? 1 : (select_index + 1) % 2);
                }}></button>
            </div>
        </div>
    );
}



function MediaContainer(props){
    let [window_index, set_window_index] = useContext(CurrentMediaWindow);


    return(
            <div className="media-container-wrapper">
                <ul className="media-container" style={{transform:`translateX(${-100 * window_index}%)`}}>
                    <BlogsContainer/>
                    <VideoContainer/>
                </ul>
            </div>
    );
}

export  {MediaIntroBar, MediaContainer};