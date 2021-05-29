import React, {useEffect, useRef, useState, useContext} from 'react';
import '../stylesheets/MediaBar.css'
import '../stylesheets/BlogDisplay.css'
import '../stylesheets/VideoCarousel.css';

import about_us_first from '../image/icons/about_us_last.svg';
import about_us_last from '../image/icons/about_us_first.svg';
import about_us_desi from '../image/icons/about_us_desii.svg';
import about_us_box from '../image/icons/about_us_box.svg';

import {CurrentMediaWindow , CurrentSectionLoadingIndex} from '../utlities/Contexts';
import BlogsContainer  from './BlogContainer';
import VideoContainer from './VideoContainer';

function MediaIntroBar(props){
    let [select_index, set_select_index] = useContext(CurrentMediaWindow);
    let data = useRef(null);
    let [images , set_images] = useState([]);
    let nav_element = useRef(null);
    let intersection_element = useRef(null);
    let [para_index , set_para_index] = useState(0);
    
    //the index of the currently loading section goes here
    let load_index = useContext(CurrentSectionLoadingIndex)[0];


    let para_main = useRef(null);

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


        //set text information on para tag
        data.current = [
            'Bringing you the <b>desi-videsi</b> blend of infotainment. Your one stop for social panchatt.',
            'Find with us your <b>interests</b> like reading, listening and watching',
            'The platform to <b>learn</b> and grow, while not compromising on the fun.',
            `For More Information <b style="margin-top:0.3em; display:Inline-block">Contact Us</b>
            <div class="social-links">
                <a href="#facebook"></a>
                <a href="#instagram"></a>
                <a href="#twitter"></a>
            </div>`
        ]
        set_images(
        [about_us_desi,about_us_first,about_us_box,about_us_last]
        )

    },[])

    useEffect(()=>{

        para_main.current.innerHTML = data.current[para_index];

    },[para_index])


    return(
        <div className="media-intro-bar" >
            <div>
                <div className="about-us-section">
                    <div className="left-section">
                        <h2>About Us</h2>
                        <p ref={para_main}>Find with us your <b>interests</b> like reading , listening and watching. </p>
                        <div className="dot-selection">
                            {
                                [para_index , para_index , para_index , para_index].map((_ , index)=>{
                                    if(index === para_index){
                                        return <span className="selected" onClick={()=>set_para_index(index)}></span>
                                    }
                                    return <span onClick={()=>set_para_index(index)}></span>
                                })
                            }
                        </div>
                    </div>    
                    <div className="right-section" 
                    >
                        {/*place your image here*/}
                        <div className="inner-image"
                            style={{backgroundImage:`url('${images[para_index]}')`}} 
                        ></div>
                    </div>
                </div> 
            </div>

            {/* fancy media title */}
            <div class="media-title">
                <span></span> {/*figure of a batsman*/}
                <h2><i></i>MEDIA<i></i></h2>
                <span></span> {/*figure of a director's chair*/}
            </div>
            {/* this below div should not be removed or sticky layout will not work for section labels */}
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
                <button className="right top" disable = {select_index === 1 ? 1 : 0} onClick={()=>{
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