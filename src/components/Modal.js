import { useContext } from "react";
import { ModalContext } from "../utlities/Contexts";
export default function ModalContainer(props){
    let [modal_data , set_modal_data] = useContext(ModalContext);
    return (
        <div className="modal-bg" visible={+modal_data.state}>
            <div className="modal">
                <i class="modal-cross" onClick={set_modal_data.bind(null , {state : !modal_data.state , heading:modal_data.heading ,  content: modal_data.content})}></i>
                <h1>{modal_data.heading || 'Modal Heading'}</h1>
                <p>{modal_data.content || 'Content Goes Here'}</p>
            </div>
        </div>
    );
}