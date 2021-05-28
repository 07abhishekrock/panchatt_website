import axios from 'axios';
const YOUTUBE_API_KEY = "AIzaSyA_qkqffsbexnXJ9ipdpDIvUXqoJFlucVc";
const CHANNEL_ID = "UCNaST5ZYBVjPOzhzU9lA7XA";
const GET_PLAYLIST_URL =`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}&maxResults=20`;
const GET_PLAYLIST_ITEMS_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=${YOUTUBE_API_KEY}&maxResults=5`;
const GET_VIDEO_DATA_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${YOUTUBE_API_KEY}`;  



async function getAllPlaylists(){
    try{
        let playlist_list_data = await axios.get(GET_PLAYLIST_URL);
        let playlist_list = playlist_list_data.data;
        return playlist_list.items;
    }
    catch(e){
        console.log(e);
    }
}

async function getPlayListItems(playlist_id , pageToken){
    try{
        let playlist_items_data = await axios.get(GET_PLAYLIST_ITEMS_URL + '&playlistId=' + playlist_id + '&pageToken=' + pageToken || '');
        if(playlist_items_data.data){

            //store all video ids in string so that can be queried through api
            let video_id_string = playlist_items_data.data.items.map((element)=>{
                return element.contentDetails.videoId;
            })
            let videos = await axios.get(GET_VIDEO_DATA_URL + '&id=' + video_id_string.join('%2C'));
            return {
                //return the videos array
                videos:videos.data && videos.data.items,
                //return the nextPageToken
                nextPageToken:playlist_items_data.data && playlist_items_data.data.nextPageToken
            };
        }
        //return fallback data
        return {videos:[],nextPageToken:''}; 
    } 
    catch(e){
        console.log(e);
    }
}


async function generatePlaylist_List(){
    try{
        let list = await getAllPlaylists();
        let final_playlist_list = [];
        for(let element of list){
            //get the list of all playlist items;
            let playlist_items = await getPlayListItems(element.id , '');
            //generate an object consisting of the playlist information and videos
            let playlist_array_item = {
                id : element.id,
                playlist_title : element.snippet.title || 'Playlist',
                playlist_desc : element.snippet.description || 'no desc',
                nextPageToken : playlist_items.nextPageToken,
                videos : (playlist_items.videos || []).map((video)=>{
                    return {
                        videoId : video.id,
                        thumbnail : video.snippet.thumbnails.medium.url,
                        title : video.snippet.title,
                        description : video.snippet.description,
                        date : video.snippet.publishedAt
                    }
                }),
            }
            //push it in a final array and then return the same later in the code;
            final_playlist_list.push(playlist_array_item);
        }
        return final_playlist_list;
    }
    catch(e){
        console.log(e);
    }
}

async function generateVideoItemsWithIdAndPageToken(id, pageToken){
}


async function generateVideoElementsForId(videos_id_array){
    
}


export  {
   generatePlaylist_List, getPlayListItems
}


