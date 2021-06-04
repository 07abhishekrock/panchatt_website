import axios from 'axios';
const YOUTUBE_API_KEY = "AIzaSyA_qkqffsbexnXJ9ipdpDIvUXqoJFlucVc";
const CHANNEL_ID = "UCNaST5ZYBVjPOzhzU9lA7XA";
const GET_PLAYLIST_URL =`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}&maxResults=20`;
const GET_PLAYLIST_ITEMS_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=${YOUTUBE_API_KEY}&maxResults=5`;
const GET_VIDEO_DATA_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${YOUTUBE_API_KEY}`;  

const NATIVE_DOMAIN = 'http://localhost:3000';



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

async function LoadAllCategories(){
    try{
        let allCategories_response = await axios.get(NATIVE_DOMAIN + '/api/categoryList');
        let allCategories_data = allCategories_response.data;
        if(allCategories_data.data && allCategories_data.data.length > 0){
            return allCategories_data.data.map((element)=>{
                return element.categoryName
            })
        }
    }
    catch(e){
        alert(e);
        console.log(e);
    }
}

async function getBlogsByCategory(category_string , pageValue = 0 , limit = 6){
    try{
        category_string = category_string.toLowerCase();
        let blogs_array_response = await axios.get(NATIVE_DOMAIN + '/api/FindBlogByCategory/' + category_string + '?page=' + pageValue + '&limit=' + limit);
        let blogs_array_data = blogs_array_response.data;
        let final_blogs_data = {};
        if(blogs_array_data.data && blogs_array_data.data.length > 0){
            final_blogs_data.blogs_array = blogs_array_data.data.map((element)=>{
                return {
                    date_created : (new Date(element.date)).toDateString().split(' ').slice(1).join(' '),
                    glance_content : element.title,
                    editor_name : 'Panchatt',
                    time_reading : element.readingtime,
                    tag:category_string,
                    url:element.coverphoto,
                    id:element._id
                }
            })
        }
        final_blogs_data.pageValue = pageValue + 1;
        return final_blogs_data;
    }
    catch(e){
        console.log(e);
    }
}

async function getSingleBlog(blog_id){
    try{
        let single_blog_response = await axios.get(NATIVE_DOMAIN + '/api/blog/' + blog_id);
        if(single_blog_response.data.single_blog){
            let element = single_blog_response.data.single_blog;
            return {
                date_created : (new Date(element.date)).toDateString().split(' ').slice(1).join(' '),
                glance_content : element.title,
                editor_name : 'Panchatt',
                time_reading : element.readingtime,
                tag:element.category,
                content:element.content,
                url:element.coverphoto,
                id:element._id
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

async function StoreNewSubscriber(email){
    try{
        console.log(email);
        await axios({
            method:'POST',
            url:NATIVE_DOMAIN + '/api/subscriber',
            data:{
                entered_email : email
            }
        });
    }
    catch(e){
        console.log(e);
    }
}

export  {
   generatePlaylist_List, getPlayListItems , LoadAllCategories, getBlogsByCategory , getSingleBlog, StoreNewSubscriber
}


