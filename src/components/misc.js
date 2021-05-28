import {useRef , useEffect} from 'react';
function IconHeading(props){
    return(
        <div className="icon-grid">
            <div className="icon">
                <span style={{backgroundImage:`url(${props.icon_url})`}}></span>
                <button>{props.text} <i visible={props.visible_toggle}></i></button>
            </div>
            <div className="right">
                <p>{props.right_text}</p>
                {props.input_present ? <InputWithButton placeholder={"Enter Your Email Here"} visible={props.input_present} button_text="Get Updates"/> : null}
            </div>
        </div>
    )
}

function InputWithButton(props){
    return(
        <div className="input-with-button">
            <input type="text" placeholder={props.placeholder}/>
            <button>{props.button_text}</button>
        </div>
    )
}

function SubHeading(props){
    let sub_ref = useRef(null);
    useEffect(()=>{
        sub_ref.current.innerHTML = props.text;
    },[])
    return <h2 className="sub-heading" ref={sub_ref}></h2>
}

export {InputWithButton , IconHeading , SubHeading};