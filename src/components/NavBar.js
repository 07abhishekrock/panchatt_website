import React, {useRef , useState} from 'react';
import '../stylesheets/NavBar.css';
function NavBar(props){
    let nav_ref = useRef(null);
    let [collapse_state, set_collapse_state] = useState(0);
    return (
        <nav ref={nav_ref} collapse={collapse_state}>
            <h1>Panchatt</h1>
            <ul className="nav-list" >
                <li>Media</li>
                <li>Courses</li>
                <li>About Us</li>
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