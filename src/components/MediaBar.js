import React, {useEffect, useRef, useState, useContext} from 'react';
import '../stylesheets/MediaBar.css'
import '../stylesheets/BlogDisplay.css'
import SwiperMyVersion from '../utlities/swiper_my_version';
import {generatePlaylist_List , generateVideoItemsWithIdAndPageToken} from '../utlities/constants';
import blogs_icon from '../image/icons/blogs.svg';
import youtube_icon from '../image/icons/youtube.svg';
import podcast_icon from '../image/icons/podcast.svg';
import 'swiper/swiper.scss';
import '../stylesheets/VideoCarousel.css';
import {CurrentMediaWindow, CurrentPlayingVideoContext, VideoAllLoadedContext} from '../utlities/Contexts';
import bg from '../image/sample_images/pranks_blog_background.jpg'
import youtube_bg from '../image/sample_images/youtube_thumbnail.jpg'
import axios from 'axios';
function MediaIntroBar(props){
    let [select_index, set_select_index] = useContext(CurrentMediaWindow);
    let nav_element = useRef(null);
    let intersection_element = useRef(null);
    useEffect(()=>{
        let new_intersection_observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.target === intersection_element.current){
                    if(entry.boundingClientRect.top < 0 && !entry.isIntersecting)
                    {
                        //fixed on top
                        nav_element.current.classList.add('fixed-class');
                    }
                    else {//if(ntry.boundingClientRect.top > 0 && entry.isIntersecting){
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
                <div className="panchatt-icon">
                <svg viewBox="0 0 578 444" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 84">
                    <g id="panchatt_shadow">
                    <g id="pedestal_and_stand">
                    <path id="Rectangle 162" d="M56.8145 211.983L48.5165 199.058L63.854 199.873L328.492 356.022L321.5 368.5L56.8145 211.983Z" fill="#D2D2D2"/>
                    </g>
                    <g id="panchatt">
                    <path id="Rectangle 168" d="M40.5072 278.112L113.249 152.979L149.18 150.463L166.665 184.031L93.9234 309.163L55.124 312.261L40.5072 278.112Z" fill="#D2D2D2"/>
                    <path id="PANCHATT" d="M74.1574 275.349C74.8952 275.778 75.469 276.343 75.8789 277.044C76.284 277.726 76.4699 278.521 76.4367 279.427C76.3987 280.315 76.0916 281.254 75.5153 282.245L74.5403 283.923L78.6555 286.315L76.6854 289.704L64.4955 282.618L67.4405 277.551C68.0101 276.572 68.6655 275.842 69.4067 275.363C70.1545 274.873 70.9344 274.632 71.7464 274.641C72.5584 274.651 73.362 274.886 74.1574 275.349ZM72.627 281.006C73.1831 280.049 73.0232 279.316 72.1471 278.807C71.2595 278.291 70.5377 278.511 69.9815 279.468L69.1975 280.817L71.843 282.355L72.627 281.006ZM86.7259 267.855L84.2131 272.178L85.8196 273.991L83.749 277.553L74.1422 266.023L76.4138 262.115L91.177 264.775L89.0963 268.354L86.7259 267.855ZM83.6398 267.195L78.9336 266.217L82.122 269.806L83.6398 267.195ZM99.5385 250.391L97.5685 253.78L88.1325 254.333L94.945 258.293L92.975 261.682L80.785 254.596L82.7551 251.207L92.2775 250.704L85.3785 246.694L87.3486 243.305L99.5385 250.391ZM95.4545 243.329C94.2557 242.632 93.3335 241.765 92.6879 240.726C92.0375 239.669 91.721 238.529 91.7384 237.306C91.7442 236.075 92.0956 234.86 92.7925 233.662C93.677 232.14 94.83 231.098 96.2515 230.537C97.6615 229.968 99.151 229.94 100.72 230.451L98.5992 234.099C98.0108 234.05 97.4816 234.151 97.0117 234.402C96.5485 234.642 96.1695 235.016 95.8746 235.523C95.419 236.307 95.3362 237.099 95.6263 237.9C95.9116 238.683 96.521 239.345 97.4547 239.888C98.4 240.438 99.289 240.646 100.122 240.513C100.95 240.362 101.592 239.895 102.047 239.111C102.342 238.604 102.479 238.09 102.458 237.569C102.444 237.036 102.27 236.526 101.936 236.039L104.057 232.391C105.278 233.501 105.996 234.813 106.211 236.326C106.415 237.833 106.074 239.347 105.19 240.868C104.493 242.067 103.617 242.977 102.562 243.598C101.496 244.212 100.349 244.501 99.1201 244.465C97.8867 244.411 96.6649 244.033 95.4545 243.329ZM104.742 213.384L116.932 220.47L114.962 223.859L110.069 221.015L107.666 225.147L112.56 227.992L110.59 231.381L98.3997 224.295L100.37 220.906L104.952 223.569L107.354 219.437L102.772 216.773L104.742 213.384ZM121.71 207.675L119.197 211.998L120.804 213.811L118.733 217.372L109.126 205.842L111.398 201.935L126.161 204.595L124.08 208.174L121.71 207.675ZM118.624 207.014L113.918 206.037L117.106 209.625L118.624 207.014ZM121.106 185.234L123.804 186.802L121.914 190.053L131.407 195.571L129.436 198.96L119.944 193.442L118.074 196.658L115.377 195.09L121.106 185.234ZM128.328 172.81L131.026 174.378L129.136 177.629L138.629 183.147L136.659 186.536L127.166 181.018L125.296 184.234L122.599 182.666L128.328 172.81Z" fill="#D2D2D2"/>
                    </g>
                    </g>
                    <g id="noid">
                    <g id="pedestal_and_stand_2">
                    <path id="Rectangle 162_2" d="M305.024 71.6694L314.866 58L324.708 71.6694V342.871H305.024V71.6694Z" fill="url(#paint0_linear)"/>
                    <path id="Vector 98" d="M260.736 354.353L305.298 343.145H323.889L373.099 354.353L383.761 378.685H252.261L260.736 354.353Z" fill="#210000" stroke="#1D0000"/>
                    </g>
                    <g id="panchatt_2">
                    <path id="Rectangle 168_2" d="M186.972 120.693L214.57 94.3057H415.069L440.243 120.689L414.996 149.092H214.643L186.972 120.693Z" fill="#DA0000" stroke="#C00000" stroke-width="7"/>
                    <path id="PANCHATT_2" d="M261.817 118.509C261.817 119.363 261.617 120.143 261.217 120.849C260.831 121.543 260.237 122.103 259.437 122.529C258.651 122.943 257.684 123.149 256.537 123.149H254.597V127.909H250.677V113.809H256.537C257.671 113.809 258.631 114.009 259.417 114.409C260.217 114.809 260.817 115.363 261.217 116.069C261.617 116.776 261.817 117.589 261.817 118.509ZM256.157 120.029C257.264 120.029 257.817 119.523 257.817 118.509C257.817 117.483 257.264 116.969 256.157 116.969H254.597V120.029H256.157ZM274.612 125.609H269.612L268.852 127.909H264.732L269.872 113.809H274.392L279.512 127.909H275.372L274.612 125.609ZM273.632 122.609L272.112 118.049L270.612 122.609H273.632ZM296.15 127.909H292.23L287.01 120.029V127.909H283.09V113.809H287.01L292.23 121.789V113.809H296.15V127.909ZM300.203 120.829C300.203 119.443 300.489 118.209 301.063 117.129C301.649 116.036 302.476 115.189 303.543 114.589C304.609 113.976 305.836 113.669 307.223 113.669C308.983 113.669 310.463 114.143 311.663 115.089C312.863 116.023 313.636 117.296 313.983 118.909H309.763C309.509 118.376 309.156 117.969 308.703 117.689C308.263 117.409 307.749 117.269 307.163 117.269C306.256 117.269 305.529 117.596 304.983 118.249C304.449 118.889 304.183 119.749 304.183 120.829C304.183 121.923 304.449 122.796 304.983 123.449C305.529 124.089 306.256 124.409 307.163 124.409C307.749 124.409 308.263 124.269 308.703 123.989C309.156 123.709 309.509 123.303 309.763 122.769H313.983C313.636 124.383 312.863 125.663 311.663 126.609C310.463 127.543 308.983 128.009 307.223 128.009C305.836 128.009 304.609 127.709 303.543 127.109C302.476 126.496 301.649 125.649 301.063 124.569C300.489 123.476 300.203 122.229 300.203 120.829ZM330.759 113.809V127.909H326.839V122.249H322.059V127.909H318.139V113.809H322.059V119.109H326.839V113.809H330.759ZM344.222 125.609H339.222L338.462 127.909H334.342L339.482 113.809H344.002L349.122 127.909H344.982L344.222 125.609ZM343.242 122.609L341.722 118.049L340.222 122.609H343.242ZM363.32 113.809V116.929H359.56V127.909H355.64V116.929H351.92V113.809H363.32ZM377.69 113.809V116.929H373.93V127.909H370.01V116.929H366.29V113.809H377.69Z" fill="white"/>
                    </g>
                    </g>
                    </g>
                    <defs>
                    <linearGradient id="paint0_linear" x1="314.866" y1="71.6694" x2="314.866" y2="342.871" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C00000"/>
                    <stop offset="1"/>
                    </linearGradient>
                    </defs>
                </svg>
                </div>
                <p><b>Welcome</b> to the official website of Panchatt, our storefront for all of our media content.</p>
            </div>
            <div className="intersection" ref={intersection_element}></div>
            <div ref={nav_element}>
                <div position = {Number(select_index)}>
                <span select={select_index === 0 ? 1 : 0} onClick={()=>{
                    set_select_index(0);
                }}>Blogs</span>
                <span select={select_index === 1 ? 1 : 0} onClick={()=>{
                    set_select_index(1);
                }}>Videos</span>
                {/* <span select={select_index === 2 ? 1 : 0} onClick={()=>{
                    set_select_index(2);
                }}>Podcasts</span> */}

                </div>
                 <button className="left top" disable = {select_index === 0 ? 1 : 0} onClick={()=>{
                    set_select_index((select_index - 1) % 3 >= 0 ? (select_index - 1) % 3 : 0);

                }}></button>
                <button className="right top" disable = {select_index === 2 ? 1 : 0} onClick={()=>{
                    set_select_index(select_index === 2 ? 2 : (select_index + 1)%3);
                }}></button>
            </div>
        </div>
    );
}

function InputWithButton(props){
    return(
        <div className="input-with-button">
            <input type="text" placeholder={props.placeholder}/>
            <button>{props.button_text}</button>
        </div>
    )
}

function IconHeading(props){
    return(
        <div className="icon-grid">
            <div className="icon">
                <span style={{backgroundImage:`url(${props.icon_url})`}}></span>
                <button>{props.text} <i visible={props.visible_toggle}></i></button>
            </div>
            <div className="right">
                <p>{props.right_text}</p>
                {props.input_present ? <InputWithButton placeholder={"Enter Your Email Here"} visible={props.input_present} button_text="Get Updates"/> : null}
            </div>
        </div>
    )
}

function SubHeading(props){
    let sub_ref = useRef(null);
    useEffect(()=>{
        sub_ref.current.innerHTML = props.text;
    },[])
    return <h2 className="sub-heading" ref={sub_ref}></h2>
}

function SimpleBlogItem(props){
    return(
        <div className="simple-blog-item">
            <img src={props.url}/>
            <span className="date">{props.date_created}</span>
            <h3>{props.glance_content}</h3>
            <span>{props.editor_name}</span>
        </div>
    )
}

function BlogDisplay(props){
    let category_ref = useRef(null);
    let [similar_blogs_list , set_similar_blogs_list] = useState([
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            tag : 0,
            url:bg,
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
    ]);
    let [total_sidebar_blog_count, set_total_sidebar_blog_count] = useState(0);
    useEffect(()=>{
        category_ref.current.innerHTML = tags[props.tag];
        let resize_event = new ResizeObserver((entries)=>{
            if(entries[0].target.offsetWidth < 1100){
                //size has reduced
                return;
            }
            let height = parent.current.getBoundingClientRect().top + parent.current.offsetHeight - similar_blog_ref.current.getBoundingClientRect().top - 30;
            similar_blog_ref.current.style.height = `${height}px`
            similar_blog_ref.current.style.gridTemplateRows = `repeat(${total_sidebar_blog_count},400px)`;
            set_total_sidebar_blog_count(Math.floor(height / 400));
        });
        resize_event.observe(parent.current);
    },[])

    let tags =  ['Entertain<i>Ment</i>'];
    let parent = useRef(null);
    let similar_blog_ref = useRef(null);
    return(
        <div className="blog-display" >
            <div className="title">
                <span>{props.date_created}</span>
                <h1>{props.glance_content}</h1>
                <span className="editor">{props.editor_name}</span>
                <span className="category" ref={category_ref}></span>
                <div className="share-div">
                    <span className="facebook"></span>
                    <span className="instagram"></span>
                    <span className="pinterest"></span>
                </div>
                <div className="progress">
                    <span style={{width:`${50}%`}}></span>
                </div>
            </div>
            <div className="blog-content" ref={parent}>
                <div className="navigation-block">
                    <span className="heading">Table of Contents</span>
                    <span>First Heading</span>
                    <span>Second Heading</span>
                    <span>Third Heading</span>
                </div>
                <div className="similar-blogs" ref={similar_blog_ref}>
                    {similar_blogs_list.map((element , index)=>{
                        if(index < total_sidebar_blog_count){
                            return <SimpleBlogItem {...element}/>
                        }
                    })}
                </div>
                <div className="text-unit">

                </div>
                <div className="text-unit">
                <h3>This&nbsp;edit<span> r is the default build of Trumbowyg.</span></h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, aliquam, minima fugiat placeat provident
                    optio nam reiciendis eius beatae quibusdam!
                </p>
                <p>
                    The text is derived from Cicero's De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or
                    alternatively [About] The Purposes of Good and Evil). The original passage began: Neque porro quisquam est
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there
                    anyone who loves grief itself since it is grief and thus wants to obtain it").
                </p>
   <p>
                    The text is derived from Cicero's De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or
                    alternatively [About] The Purposes of Good and Evil). The original passage began: Neque porro quisquam est
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there
                    anyone who loves grief itself since it is grief and thus wants to obtain it").
                </p>   <p>
                    The text is derived from Cicero's De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or
                    alternatively [About] The Purposes of Good and Evil). The original passage began: Neque porro quisquam est
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there
                    anyone who loves grief itself since it is grief and thus wants to obtain it").
                </p>
 <p>
                    The text is derived from Cicero's De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or
                    alternatively [About] The Purposes of Good and Evil). The original passage began: Neque porro quisquam est
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there
                    anyone who loves grief itself since it is grief and thus wants to obtain it").
                </p>
                 <p>
                    The text is derived from Cicero's De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or
                    alternatively [About] The Purposes of Good and Evil). The original passage began: Neque porro quisquam est
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there
                    anyone who loves grief itself since it is grief and thus wants to obtain it").
                </p>
 <p>
                    The text is derived from Cicero's De Finibus Bonorum et Malorum (On the Ends of Goods and Evils, or
                    alternatively [About] The Purposes of Good and Evil). The original passage began: Neque porro quisquam est
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit (Translation: "Neither is there
                    anyone who loves grief itself since it is grief and thus wants to obtain it").
                </p>
                </div>


            </div>
                        <div className="blog-bottom-btn">
                <div>
                    <span>Read <i>Previous</i></span>
                    <h3>7 Horror Movies that You have to watch this halloween !!!</h3>
                </div>
                <div>
                    <span>Read <i>Next</i></span>
                    <h3>7 Horror Movies that You have to watch this halloween !!!</h3>
                </div>
            </div>
        </div>
    );
}

function BlogUnit(props){
    let category_ref = useRef(null);
    useEffect(()=>{
        category_ref.current.innerHTML = tags[props.tag];
    },[])
    let tags =  ['Entertain<i>Ment</i>']
    return(<div className="blog-unit">
        <img src={props.url}/>
        <div>
            <span ref={category_ref}></span>
            <div className="inline-info">
                <span>{props.editor_name}</span>
                <span>{props.date_created}</span>
                <span>{props.time_reading}</span>
            </div>
            <p>{props.glance_content}</p>
            <button>Read More</button>
        </div>
    </div>);
}

function BlogGridUnit(props){
    let [blogs_list , set_blogs_list] = useState([
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            tag : 0,
            url:bg,
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
        {
            date_created : '30 Apr 2020',
            glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
            editor_name : 'Abhinav Shukla',
            time_reading:'4min',
            url:bg,
            tag : 0
        },
    ]);
    useEffect(()=>{
        axios.get('https://kem-palty-admin-panel.herokuapp.com/api/blog').then((data)=>{
                console.log(data.data);
            }
        );
    })
    return(
    <div className="blogs-grid-wrapper">
        <SubHeading text={"Blogs <i>2021</i>"}/>
        <div className="blogs-grid">
            {blogs_list.map((element, index)=>{
            return <BlogUnit {...element} key={index}/>
            })}
        </div>
    </div>
    )
}

function BlogsContainer(props){

    let element = {
        date_created : '30 Apr 2020',
        glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
        editor_name : 'Abhinav Shukla',
        time_reading:'4min',
        url:bg,
        tag : 0
    }

    return(
        <li className="blogs">
            <IconHeading icon_url={blogs_icon} visible_toggle={0} text={"Blogs And Reviews"} input_present="1" right_text={"Subscribe to our monthly Newsletter to Receive Updates On Blogs"}/>
            <BlogDisplay {...element}/>
            <BlogGridUnit/>
        </li>
    );
}

function Loader(props){
    if(props.visible === '1'){
        return (
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
    else{
        return null;
    }
}

function RightVideoGrid({children,current_playlist}){
    let parent = useRef(null);
    let [currently_observing_element_index , set_currently_observing_element_index] = useState(-1);
    let current_playlist_id = useContext(CurrentPlayingVideoContext)[0];
    let current_index = useContext(CurrentPlayingVideoContext)[2];
    let next_page_token = useContext(CurrentPlayingVideoContext)[4];
    let [playlist_all, set_playlist_all] = useContext(VideoAllLoadedContext);
    let right_video_grid_intersection_observer = useRef(null);
    let [is_loading , set_is_loading] = useState(0);

    useEffect(()=>{
    right_video_grid_intersection_observer.current = new IntersectionObserver(async (entries)=>{
        if(entries[0].isIntersecting){
            //load next page
            set_is_loading('1');
            let added_video_array = await generateVideoItemsWithIdAndPageToken(current_playlist_id , next_page_token);
            set_playlist_all(playlist_all.map((playlist, index)=>{
                if(playlist.playlist_id === current_playlist_id){
                    if(playlist.nextPageToken === added_video_array.nextPageToken){
                        return playlist;
                    }
                    playlist.array = [...playlist.array , ...added_video_array.array];
                    playlist.nextPageToken = added_video_array.nextPageToken;
                }
                return playlist;
            }));
            set_is_loading('0');
        }
    }, {
        root:parent.current,
        threshold:0.9
    });
    },[current_playlist_id, next_page_token])

    useEffect(()=>{
        if(current_playlist.length){
            if(currently_observing_element_index !== -1 && parent.current.children[currently_observing_element_index]){
                right_video_grid_intersection_observer.current.unobserve(parent.current.children[currently_observing_element_index]);
            }
            set_currently_observing_element_index(current_playlist.length - 1);
        }
    },[current_playlist])

    useEffect(()=>{
        if(currently_observing_element_index === -1) return;
        right_video_grid_intersection_observer.current.observe(parent.current.children[currently_observing_element_index]);
    },[currently_observing_element_index])

    return <div className="right-video-grid">
        <h1>Up Next</h1>
        <div className="right-video-scroll" ref={parent}>
            {current_playlist.map((element,index)=>{
                if(index === current_index){
                    return <VideoElement special="1" {...element} id={element.id} index={index}/>
                }
                return(
                    <VideoElement {...element} id={element.id} index={index}/>
                );
            })}
            <Loader visible={is_loading}/>
        </div>
    </div>
}

function MainVideoBox(props){
    let [collapsed, set_collapsed] = useState(1);
    let current_playlist_id = useContext(CurrentPlayingVideoContext)[0];
    let current_index = useContext(CurrentPlayingVideoContext)[2];
    let next_page_token = useContext(CurrentPlayingVideoContext)[4];
    let [playlist_all ,set_playlist_all] = useContext(VideoAllLoadedContext);
    let [current_playlist, set_current_playlist] = useState([]);

    useEffect(()=>{
        let current_playlist_check = playlist_all.filter((element, index)=>{
            return (element.playlist_id === current_playlist_id);
        })[0]
        if(current_playlist_check){
            if(current_playlist_check.array){
                set_current_playlist(current_playlist_check.array);
            }
        }
    },[playlist_all , current_playlist_id, current_index])

    return (
        <div className="main-video-grid">
            <div className="main-video-box">
                <iframe src={(`https://www.youtube.com/embed/${current_playlist[current_index] ? current_playlist[current_index].id : 0}`)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                <div className="desc-collapsible" collapse={collapsed}>
                    <div className="desc-title"><span>{current_playlist[current_index] ? current_playlist[current_index].title : 'no title'}</span><i onClick={()=>{set_collapsed((collapsed + 1)%2)}}></i></div>
                    <p><span>Uploaded on {current_playlist[current_index] ? new Date(current_playlist[current_index].date).toDateString() : 'no date'}</span>{current_playlist[current_index] ? current_playlist[current_index].description : 'no description'}</p>
                </div>
            </div>
            <VideoCarouselID.Provider value={[current_playlist_id , next_page_token]}>
                <RightVideoGrid current_playlist = {current_playlist}/>
            </VideoCarouselID.Provider>
        </div>
    )
}

let VideoCarouselID = React.createContext();

function VideoCarousel(props){
    let parent = useRef(null);
    useEffect(()=>{
        let new_swiper_object = new SwiperMyVersion('video-wrapper','video-parent','btn-left','btn-right',360,props.index);
        new_swiper_object.init();
    },[])
    return(
        <div className="video-wrapper-wrapper">
            <SubHeading text="Social <i>Vani</i> Episodes"/>
            <div className="video-wrapper">
                <div className="video-parent" ref={parent}>
                    {props.children}
                    <div className="load-more-button">
                        <span>View All Videos</span>
                    </div>
                </div>
            </div>
            <button className="btn-left left"></button>
            <button className="btn-right right"></button>
        </div>
        );
}

function VideoElement(props){
    let [playlist_id, next_page_token] = useContext(VideoCarouselID);
    let set_current_playlist_id = useContext(CurrentPlayingVideoContext)[1];
    let set_next_page_token = useContext(CurrentPlayingVideoContext)[5];
    let set_current_index = useContext(CurrentPlayingVideoContext)[3];
    return(
        <div className="video-element" special={props.special || 0}
        onClick={()=>{
            console.log('element is clicked');
            set_current_playlist_id(playlist_id);
            set_current_index(props.index);
            set_next_page_token(next_page_token);
            let main_video_box = document.querySelector('div.main-video-grid');
            main_video_box.scrollIntoView(0);
        }}>
            <img className="thumbnail" src={props.thumbnail}></img>
            <span>{props.title.length > 23 ? props.title.substring(0,20) + '...' : props.title}</span>
            <span>{new Date(props.date).toDateString().split(' ').slice(1).join(' ')}</span>
        </div>
    )
}

function VideoContainer(props){
    //edit context here
    let [video_array, set_video_array] = useState([]);
    useEffect(async()=>{
        let final_array = await generatePlaylist_List();
        console.log(final_array);
        set_video_array(final_array);
    },[]);



    let [current_playlist_id, set_current_playlist_id] = useState();
    let [next_page_token , set_next_page_token] = useState(0);
    let [current_index, set_current_index] = useState(0);
    return(
        <li className="video">
            <IconHeading icon_url={youtube_icon} visible_toggle={1} text={"Visit Channel"} right_text={"Subscribe to us on YouTube for daily updates on all our video Titles"}/>
            <VideoAllLoadedContext.Provider value={[video_array, set_video_array]}>
            <CurrentPlayingVideoContext.Provider value={[current_playlist_id , set_current_playlist_id, current_index , set_current_index, next_page_token, set_next_page_token]}>
            <MainVideoBox/>
                {video_array.map((playlist, index)=>{
                    return(
                        <VideoCarouselID.Provider value={[playlist.playlist_id, playlist.nextPageToken]}>
                        <VideoCarousel index={index} key={playlist.playlist_id}>
                            {playlist.array.map((video,sub_index)=>{
                                return <VideoElement key={video.id} index={sub_index} {...video}/>
                            })}
                        </VideoCarousel>
                        </VideoCarouselID.Provider>
                    )
                })}
            </CurrentPlayingVideoContext.Provider>
            </VideoAllLoadedContext.Provider>
        </li>
    )
}

function PodcastGrid(props){
    let [podcast_items, set_podcast_items] = useState([
        {
            title:'The Youth Voice Ep 1 and this is the name',
            date:"23 Apr 2021",
            time:"3:14"
        },
        {
            title:'The Youth Voice Ep 2',
            date:"23 Apr 2021",
            time:"3:14"
        },
        {
            title:'The Youth Voice Ep 2',
            date:"23 Apr 2021",
            time:"3:14"
        },
        {
            title:'The Youth Voice Ep 2',
            date:"23 Apr 2021",
            time:"3:14"
        },
        {
            title:'The Youth Voice Ep 2',
            date:"23 Apr 2021",
            time:"3:14"
        },
        {
            title:'The Youth Voice Ep 2',
            date:"23 Apr 2021",
            time:"3:14"
        },
        {
            title:'The Youth Voice Ep 2',
            date:"23 Apr 2021",
            time:"3:14"
        },
        {
            title:'The Youth Voice Ep 2',
            date:"23 Apr 2021",
            time:"3:14"
        },
        {
            title:'The Youth Voice Ep 2',
            date:"23 Apr 2021",
            time:"3:14"
        },
    ])
    return(
        <div className="podcast-grid-wrapper">
            <SubHeading text="2021 <i>PODCAST</i>"/>
            <div className="podcast-grid">
                {podcast_items.map((element,index)=>{
                    return(<PodcastUnit id={index} {...element}/>);
                })}
            </div>
        </div>
    )
}

function PodcastUnit(props){
    return(
        <div className="podcast-unit">
            <div>
                <button className="play"></button>
                <div className="span-wrapper">
                    <span>{props.title}</span>
                </div>
                <span className="time">{props.time} Minutes</span>
            </div>
            <span>{props.date}</span>
        </div>
    )
}

function PodcastContainer(props){
    return(
        <li className="podcast">
            <IconHeading icon_url={podcast_icon} visible_toggle={0} text={"Podcasts"} input_present="1" right_text={"Subscribe to Our Podcasts To Receive Timely Updates via Email"}/>
            <PodcastGrid/>
        </li>
    )
}

function MediaContainer(props){
    let [window_index, set_window_index] = useContext(CurrentMediaWindow);
    return(
        <div className="media-container-wrapper">
            <ul className="media-container" style={{transform:`translateX(${-100 * window_index}%)`}}>
                <BlogsContainer/>
                <VideoContainer/>
                {/* <PodcastContainer/> */}
            </ul>
        </div>
    );
}

export  {MediaIntroBar, MediaContainer};