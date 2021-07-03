import {useRef , useEffect, useContext} from 'react';
import {StoreNewSubscriber} from '../utlities/constants';
import {ModalContext} from '../utlities/Contexts';

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
    let form = useRef(null);
    let email_input = useRef(null);
    let [,set_modal_state] = useContext(ModalContext);
    return(
        <form ref={form}>
            <div className="input-with-button">
                <input type="email" ref={email_input}  placeholder={props.placeholder}/>
                <button  onClick={async (e)=>{
                    e.preventDefault();
                    try{
                        if(form.current.checkValidity())
                        {
                            await StoreNewSubscriber(email_input.current.value);
                            set_modal_state({
                                state:true,
                                heading:'Registered',
                                content:'You are successfully registered for the newsletter via mail. You will receive timely notifications when site is updated with a new blog.'
                            })
                        }
                        else{
                            set_modal_state({
                                state:true,
                                heading:'Invalid Email',
                                content:'Please Enter a valid email to continue'
                            })
                        }
                    }
                    catch(e){
                        set_modal_state({
                                state:true,
                                heading:'Server Error',
                                content:e.message
                            })
                    }
                }}>{props.button_text}</button>
            </div>
        </form>
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