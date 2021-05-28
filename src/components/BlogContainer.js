import {useRef , useEffect, useState, useContext} from 'react';
import bg from '../image/sample_images/pranks_blog_background.jpg'
import axios from 'axios';
import { IconHeading , InputWithButton, SubHeading } from './misc';
import blogs_icon from '../image/icons/blogs.svg';
import { CurrentMediaWindow } from '../utlities/Contexts';

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

    let window_index = useContext(CurrentMediaWindow)[0];

    let element = {
        date_created : '30 Apr 2020',
        glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
        editor_name : 'Abhinav Shukla',
        time_reading:'4min',
        url:bg,
        tag : 0
    }

    return(
        <li className="blogs" style={{
            maxHeight:`${window_index === 0 ? 'initial' : '200px'}`
        }}
        >
            <IconHeading icon_url={blogs_icon} visible_toggle={0} text={"Blogs And Reviews"} input_present="1" right_text={"Subscribe to our monthly Newsletter to Receive Updates On Blogs"}/>
            <BlogDisplay {...element}/>
            <BlogGridUnit/>
        </li>
    );
}

export default BlogsContainer;