
function PodcastGrid(props){
    let [podcast_items, set_podcast_items] = useState([
        {
            title:'The Youth Voice Ep 0 and this is the name',
            date:"22 Apr 2021",
            time:"2:14"
        },
        {
            title:'The Youth Voice Ep 1',
            date:"22 Apr 2021",
            time:"2:14"
        },
        {
            title:'The Youth Voice Ep 1',
            date:"22 Apr 2021",
            time:"2:14"
        },
        {
            title:'The Youth Voice Ep 1',
            date:"22 Apr 2021",
            time:"2:14"
        },
        {
            title:'The Youth Voice Ep 1',
            date:"22 Apr 2021",
            time:"2:14"
        },
        {
            title:'The Youth Voice Ep 1',
            date:"22 Apr 2021",
            time:"2:14"
        },
        {
            title:'The Youth Voice Ep 1',
            date:"22 Apr 2021",
            time:"2:14"
        },
        {
            title:'The Youth Voice Ep 1',
            date:"22 Apr 2021",
            time:"2:14"
        },
        {
            title:'The Youth Voice Ep 1',
            date:"22 Apr 2021",
            time:"2:14"
        },
    ])
    return(
        <div className="podcast-grid-wrapper">
            <SubHeading text="2020 <i>PODCAST</i>"/>
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
            <IconHeading icon_url={podcast_icon} visible_toggle={-1} text={"Podcasts"} input_present="1" right_text={"Subscribe to Our Podcasts To Receive Timely Updates via Email"}/>
            <PodcastGrid/>
        </li>
    )
}
