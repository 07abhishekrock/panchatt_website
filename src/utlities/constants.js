const youtube_api_key = "AIzaSyA_qkqffsbexnXJ9ipdpDIvUXqoJFlucVc";
const channel_id = "UCNaST5ZYBVjPOzhzU9lA7XA";
const get_playlist_id_url =`https://youtube.googleapis.com/youtube/v3/playlists?part=id&channelId=${channel_id}&key=${youtube_api_key}`;
const get_playlist_items_array_url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=${youtube_api_key}&maxResults=5`;

async function generatePlaylist_List(pageToken){
    let playlist_id_list = await fetch(get_playlist_id_url);
    let playlist_id_list_data = await playlist_id_list.json();
    if(playlist_id_list_data['error']){
        console.log("Could Not Process The Request");
        return;
    }
    else{
        console.log('request complete');
        let final_array = [];
        for(let element of playlist_id_list_data.items){
            let final_url = get_playlist_items_array_url + `&playlistId=${element.id}` + (pageToken ? `&pageToken=${pageToken}` : '');
            let playlist_videos = await fetch(final_url);
            let playlist_videos_data = await playlist_videos.json();
            let videos_id_array = playlist_videos_data.items.map((element)=>{
                return element.contentDetails.videoId;
            });
            let current_playlist_videos = await generateVideoElementsForId(videos_id_array);
            final_array.push({playlist_id : element.id,array : current_playlist_videos , nextPageToken : playlist_videos_data.nextPageToken});
        }
        return final_array;
    }
}

async function generateVideoItemsWithIdAndPageToken(id, pageToken){
    return new Promise(async (resolve , reject)=>{let final_url = get_playlist_items_array_url + `&playlistId=${id}` + (pageToken ? `&pageToken=${pageToken}` : '');
    let playlist_videos = await fetch(final_url);
    let playlist_videos_data = await playlist_videos.json();
    let videos_id_array = playlist_videos_data.items.map((element)=>{
        return element.contentDetails.videoId;
    });
    let current_playlist_videos = await generateVideoElementsForId(videos_id_array);
    resolve({array : current_playlist_videos , nextPageToken : playlist_videos_data.nextPageToken});
    })
}


async function generateVideoElementsForId(videos_id_array){
    return new Promise(async (resolve, reject)=>{let video_details_url = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videos_id_array.join('%2C')}&key=${youtube_api_key}`);
    video_details_url = await video_details_url.json();
    let final_videos_array = [];
    for(let video of video_details_url.items){
        final_videos_array.push({
            id:video.id,
            title:video.snippet.title,
            description:video.snippet.description,
            thumbnail:video.snippet.thumbnails.medium.url,
            date:video.snippet.publishedAt
        });
    }
    resolve(final_videos_array);
    })
}


export  {
    generatePlaylist_List, generateVideoElementsForId, generateVideoItemsWithIdAndPageToken
}


