import {useRef , useEffect, useState, useContext} from 'react';
import bg from '../image/sample_images/pranks_blog_background.jpg'
import { IconHeading , SubHeading } from './misc';
import blogs_icon from '../image/icons/blogs.svg';
import { CurrentMediaWindow , CurrentBlogContext ,BlogLoadingIndex} from '../utlities/Contexts';
import { LoadAllCategories , getBlogsByCategory , getSingleBlog} from '../utlities/constants';



function BlogDisplay(props){
    let current_blog_data = useContext(CurrentBlogContext)[0];
    
    let parent = useRef(null);

    let blog_actual_content = useRef(null);
    useEffect(()=>{
        blog_actual_content.current.innerHTML = `<img src="${current_blog_data.url}"/>` + current_blog_data.content;
    },[current_blog_data])

    return(
        <div className="blog-display" >
            <div className="title">
                <span>{current_blog_data.date_created}</span>
                <h1>{current_blog_data.glance_content}</h1>
                <span className="editor">{current_blog_data.editor_name}</span>
                <span className="category">{current_blog_data.tag}</span>
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
                <div className="text-unit" ref={blog_actual_content}></div>
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

    let [current_blog_data , set_current_blog_data] = useContext(CurrentBlogContext);

    return(<div className="blog-unit" onClick={async ()=>{
        try{
            let single_blog = await getSingleBlog(props.id);
            if(single_blog){
                set_current_blog_data(single_blog);
                let blog_main_display = document.querySelector('li.blogs>div.icon-grid');
                blog_main_display.scrollIntoView(-1);
            }
        }
        catch(e){

        }
    }}>
        <img style={{objectFit:'cover'}} src={props.url}/>
        <div>
            <div className="inline-info">
                <span>{props.editor_name}</span>
                <span>{props.date_created}</span>
                <span>{props.time_reading > 1 ? props.time_reading + ' Mins' : props.time_reading + ' Min'}</span>
            </div>
            <p>{props.glance_content}</p>
            <button>Read More</button>
        </div>
    </div>);
}

function BlogGridUnit(props){
    let [blogs_list , set_blogs_list] = useState([]);

    function CapitaliseFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function HighlightOdd(string){
        return `${string.split(' ').map((element, index)=>{
            if(index % 2 !== 0){
                return `<i>${element}</i>` 
            }
            return element
        }).join(' ')}`
    }
    
    return(
    <div className="blogs-grid-wrapper">
        <SubHeading text={HighlightOdd(CapitaliseFirstLetter((props.blogs[0].tag || '') + ' Blogs'))}/>
        <div className="blogs-grid">
            {props.blogs.map((element)=>{
                return <BlogUnit {...element} key={element.id}/>
            })}
        </div>
    </div>
    )
}

function BlogsContainer(props){

    let window_index = useContext(CurrentMediaWindow)[0];

    let set_load_index = useContext(BlogLoadingIndex)[1];
    
    let [blogs_categories_data , set_blogs_categories_data] = useState([]);

    let [current_blog_data , set_current_blog_data] = useState({});

    let element = {
        date_created : '30 Apr 2020',
        glance_content : '7 Companies that started off as a joke but eventually turned succesfull',
        editor_name : 'Abhinav Shukla',
        time_reading:'4min',
        url:bg,
        tag : 0
    }
    useEffect(async ()=>{
        try{

            set_load_index(1);

            let allCategories = await LoadAllCategories();
            //make request for each category while pushing obtained ones on the page in parallel

            let initial_blogs_data = [];

            if(allCategories){
                for(let category of allCategories){
                    let blogs_data = await getBlogsByCategory(category);
                    if(blogs_data.blogs_array){
                        initial_blogs_data.push({blogs : blogs_data.blogs_array , pageValue : blogs_data.pageValue})
                    }
                }
            }
            set_blogs_categories_data(initial_blogs_data);

            console.log('bye world');

            set_load_index(-1);
        }
        catch(e){
            console.log(e);
        }

    },[])

    return(
        <li className="blogs" style={{
            maxHeight:`${window_index === 0 ? 'initial' : '200px'}`
        }}
        >
            <IconHeading icon_url={blogs_icon} visible_toggle={0} text={"Blogs And Reviews"} input_present="1" right_text={"Subscribe to our monthly Newsletter to Receive Updates On Blogs"}/>
            <CurrentBlogContext.Provider value={[current_blog_data , set_current_blog_data]}>
                <BlogDisplay {...element}/>
                {
                    blogs_categories_data.map((element, index)=>{
                        return <BlogGridUnit key={index} {...element}/>
                    })
                }
            </CurrentBlogContext.Provider>
        </li>
    );
}

export default BlogsContainer;