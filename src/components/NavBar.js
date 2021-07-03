import React, {useContext, useRef , useState} from 'react';
import { ModalContext } from '../utlities/Contexts';
import '../stylesheets/NavBar.css';
import { jumpToAnchorId } from '../utlities/functions';
function NavBar(props){
    let nav_ref = useRef(null);
    let [,set_modal_data] = useContext(ModalContext);
    let [collapse_state, set_collapse_state] = useState(0);
    return (
        <nav ref={nav_ref} collapse={collapse_state}>
            <h1>Panchatt</h1>
            <ul className="nav-list" >
                <li onClick={jumpToAnchorId.bind(window , 'media')}>Media</li>
                <li onClick={set_modal_data.bind(null , {state:true , heading : 'Coming Soon' , content: "Courses Section will soon be updated on the website, till then hang tight."})}>Courses</li>
                <li onClick={jumpToAnchorId.bind(window , 'about-us')}>About Us</li>
                <li className="special"><div>Subscribe</div></li>
            </ul>
            <div className="burger" onClick={()=>{
                set_collapse_state((collapse_state + 1) % 2);
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    )
}

export default NavBar;