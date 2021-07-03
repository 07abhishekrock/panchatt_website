const jumpToAnchorId = (id)=>{
    console.log(this , id);
    let location = window.location;
    let location_href_values = location.href.split('/') , 
    length = location_href_values.length;

    location.href= location_href_values.slice(0 , length - 1).join('/') + '#' + id;
}

export {jumpToAnchorId};