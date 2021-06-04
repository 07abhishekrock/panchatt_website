import React , {useRef , useEffect, useState, useContext} from 'react';
import youtube_icon from '../image/icons/youtube.svg';
import SwiperMyVersion from '../utlities/swiper_my_version';
import {generatePlaylist_List , getPlayListItems} from '../utlities/constants';
import {CurrentMediaWindow, CurrentPlayingVideoContext, VideoLoadingIndex, VideoAllLoadedContext} from '../utlities/Contexts';
import { IconHeading , InputWithButton, SubHeading } from './misc';

//set the max videos that are there on a single page.
const MAX_VIDEOS_PER_PAGE = 5;

let VideoCarouselContext = React.createContext({
    playlistId:'',
    nextPageToken:''
});

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

function RightVideoGrid(){
    let parent = useRef(null);

    //loading flag is important for loading new videos when scrolled too much.
    let [is_loading , set_is_loading] = useState(0);

    //max loaded -- no more available
    let [max_loaded , set_max_loaded] = useState(0);

    //current playlist id and current video 
    let current_playlist_id = useContext(CurrentPlayingVideoContext).current_playlist_id;
    // let current_video = useContext(CurrentPlayingVideoContext).current_video;
    let allPlaylists = useContext(VideoAllLoadedContext).video_array;

    //current playlist state variable , with a dummy videos attribute and nextPageToken.
    let [current_playlist, set_current_playlist] = useState({videos:[] , nextPageToken:''});


    let current_video = useContext(CurrentPlayingVideoContext).current_video;


    useEffect(()=>{

        //get the current playlist and store it in a local state variable.
        let current_playlist_to_set = allPlaylists.filter((playlist)=>playlist.id === current_playlist_id);

        //check if playlist is there...
        if(current_playlist_to_set[0]){
            set_current_playlist(current_playlist_to_set[0]);
        }

    },[current_playlist_id])

    async function updatePlaylist(){

        if(max_loaded){
            return;
        }

        //initialise loading process
        set_is_loading('1');

        //reached maximum bottom --> make a new api request to get
        //the next page of videos
        let new_videos = await getPlayListItems(
            current_playlist_id, 
            current_playlist.nextPageToken 
        );

        //generate videos array to append in the current playlist.
        let new_videos_array = (new_videos && new_videos.videos || []).map((video)=>{

            return {
                videoId : video.id,
                thumbnail : video.snippet.thumbnails.medium.url,
                title : video.snippet.title,
                description : video.snippet.description,
                date : video.snippet.publishedAt
            };

        })

        if(new_videos_array.length < MAX_VIDEOS_PER_PAGE){
            //maximum data has been loaded
            set_max_loaded(1);
        }

        //append new videos and the nextPageToken to the current playlist
        set_current_playlist({
            videos : [...current_playlist.videos , ...new_videos_array],
            nextPageToken : new_videos && new_videos.nextPageToken || '',
            id:current_playlist_id
        });

        //once loading process is fulfilled 
        set_is_loading('0');
    }


    return <div className="right-video-grid">
        <h1>Up Next</h1>
        <div className="right-video-scroll" ref={parent} onScroll={async (e)=>{
            try{
                if(max_loaded){
                    return;
                }
                if(window.innerWidth > 830){
                    if(Math.ceil(e.target.scrollTop + e.target.offsetHeight) >= e.target.scrollHeight){

                        console.log('detected');
                        await updatePlaylist() 
                    }
 
                }
                else{
                    if(Math.ceil(e.target.scrollLeft + e.target.offsetWidth) >= e.target.scrollWidth){

                        console.log('detected');
                        await updatePlaylist();

                    } 
                }
            }
            catch(e){
                console.log(e);
            }
        }}>
            {
                //render video elements to display on the right video grid
                current_playlist.videos.map((video , video_index)=>{

                    return <VideoElement special={Number(video_index === current_video.index)} key={video.videoId} {...video} index={video_index}/>

                })
            }

            <Loader visible={is_loading}/>

        </div>
    </div>
}

function MainVideoBox(props){
    let [collapsed, set_collapsed] = useState(1);

    //global values
    let current_video = useContext(CurrentPlayingVideoContext).current_video;

    return (
        <div className="main-video-grid">
            <div className="main-video-box">
                <iframe src={(`https://www.youtube.com/embed/${current_video.videoId}`)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                <div className="desc-collapsible" collapse={collapsed}>
                    <div className="desc-title"><span>{current_video.title}</span><i onClick={()=>{set_collapsed((collapsed + 1)%2)}}></i></div>
                    <p>
                        <span>Uploaded on {(new Date(current_video.date)).toDateString().split(' ').slice(1).join(' ')}</span>
                        {
                            current_video.description
                        }   
                    </p>
                </div>
            </div>
                <RightVideoGrid />
        </div>
    )
}


function VideoCarousel(props){
    let parent = useRef(null);
    useEffect(()=>{
        let new_swiper_object = new SwiperMyVersion('video-wrapper','video-parent','btn-left','btn-right',360,props.index);
        new_swiper_object.init();
    },[])

    



    return(
        <div className="video-wrapper-wrapper">

            {/*generate styles for even words in the heading*/}
            <SubHeading text={props.title.split(' ').map((element , index)=>{
                if(index % 2 !== 0){
                    return `<i>${element}</i>`
                }
                return element;
            }).join(' ')}/>



            <div className="video-wrapper">
                <div className="video-parent" ref={parent}>
                    {props.children}
                    <div className="load-more-button">
                        <span onClick={()=>{
                            parent.current.children[0].click();
                        }}>View All Videos</span>
                    </div>
                </div>
            </div>
            <button className="btn-left left"></button>
            <button className="btn-right right"></button>
        </div>
        );
}

function VideoElement(props){

     
    /*
    Structure of video element

    videoid : id, 
    thumbnail : url,
    title : string,
    description : string, 
    date : date
    */
     


    //global values
    let current_playlist_id = useContext(CurrentPlayingVideoContext).current_playlist_id;
    let set_current_playlist_id = useContext(CurrentPlayingVideoContext).set_current_playlist_id;
    let set_next_page_token = useContext(CurrentPlayingVideoContext).set_next_page_token;
    let set_current_video = useContext(CurrentPlayingVideoContext).set_current_video;
    let current_video = useContext(CurrentPlayingVideoContext).current_video;

    //self values
    let self_playlist_id = useContext(VideoCarouselContext).playlistId;
    let self_page_token = useContext(VideoCarouselContext).nextPageToken;

    return(
        <div className="video-element" special={Number(props.index === current_video.index)}
            onClick={(e)=>{
                //set next page token and playlist id for the global context
                if(current_playlist_id !== self_playlist_id){
                    set_current_playlist_id(self_playlist_id);
                    set_next_page_token(self_page_token);
                }
                set_current_video({
                    videoId:props.videoId,
                    description:props.description,
                    date:props.date,
                    title:props.title,
                    index:props.index
                });

                //scrolling to the main video box to get the video in the focus.
                let main_video_box = document.querySelector('div.main-video-box');
                main_video_box.scrollIntoView(0);


                let right_video_scroll = document.querySelector('div.right-video-scroll');
                if(window.innerWidth < 830){
                    right_video_scroll.scrollLeft = 0;
                    right_video_scroll.scrollBy(props.index * 240 , 0);
                }
                else{
                    right_video_scroll.scrollTop = 0;
                    right_video_scroll.scrollBy(0 , props.index * 280);
                }
        }}>

            <img className="thumbnail" src={props.thumbnail}></img>
            <span>{props.title.length > 30 ? props.title.substring(0,27) + '...' : props.title}</span>

            {/* generate Dates for all videos */}
            <span>{(new Date(props.date)).toDateString().split(' ').slice(1).join(' ')}</span>

        </div>
    )
}

function VideoContainer(props){
    //edit context here
    let [video_array, set_video_array] = useState([]);
    //loading index
    let set_load_index = useContext(VideoLoadingIndex)[1]; 
    useEffect( async()=>{
        
        /* 
            The playlist object structure is as follows
        
            id : id,
            playlist_title : string,
            playlist_desc : string,
            nextPageToken : string,
            videos : array of objects

        */
        //initialise loading process
        set_load_index(1);
        
        let final_array = await generatePlaylist_List();

        //set the video array as the playlists array, so that it
        //can be iterated and all carousels can be displayed
        set_video_array(final_array || []);


        //stop loading
        set_load_index(-1);

    },[]);


    //playlist_id and pageToken is used to generate next page information;
    let [current_playlist_id, set_current_playlist_id] = useState(0);
    let [next_page_token , set_next_page_token] = useState(0);

    //current index signifies the current video that is running on the main video box
    let [current_video, set_current_video] = useState({
        videoId:0,
        description:'No Description Available',
        title:'Fetching ...',
        Date:'No Date Available'
    });
    
    let window_index = useContext(CurrentMediaWindow)[0];
    
    return(
        <li className="video" style={{
            maxHeight:`${window_index === 1 ? 'initial' : '200px'}`
        }}>

            <IconHeading 
            icon_url={youtube_icon} 
            visible_toggle={1} 
            text={"Visit Channel"} 
            right_text={"Subscribe to us on YouTube for daily updates on all our video Titles"}
            />

            {/* Context that defines all the loaded videos and playlists */}
            <VideoAllLoadedContext.Provider value={{video_array , set_video_array}}>

            {/* Context that defines all the loaded videos of the current playlist and their index and Id */}
            <CurrentPlayingVideoContext.Provider value={{
                current_video, 
                set_current_video,

                current_playlist_id,
                set_current_playlist_id, 

                next_page_token,
                set_next_page_token
            }}>

            <MainVideoBox/>

                {video_array.map((playlist, index)=>{
                    return(
                        //
                        <VideoCarousel index={index} key={playlist.id} title={playlist.playlist_title} >
                            <VideoCarouselContext.Provider 
                                value={{
                                    nextPageToken : playlist.nextPageToken || '' , 
                                    playlistId : playlist.id || ''
                            }}>

                                {/* Video Carousel Context defines the playlist id and page token for a current set of videos */}
                                

                                    {playlist.videos.map((video,sub_index)=>{
                                        return <VideoElement key={video.videoId} index={sub_index} {...video}/>
                                    })}


                            </VideoCarouselContext.Provider>
                        </VideoCarousel>
                    )
                })} 


            </CurrentPlayingVideoContext.Provider>

            </VideoAllLoadedContext.Provider>
        </li>
    )
}

export default VideoContainer;