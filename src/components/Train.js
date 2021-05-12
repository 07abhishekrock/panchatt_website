import React, { useEffect, useRef, useState } from 'react';
import '../stylesheets/TrainAssembly.css';
import {gsap} from 'gsap';


function Train(props){
    let [stage, set_stage] = useState(1);
    let scroll_ref = useRef(0);
    let train_ref = useRef(null);

//     window.onscroll = (()=>{

// //-------enable when you want to start animation

//         // let scroll_limit = 400;
//         // let scroll_position = window.scrollY;
//         // if(scroll_position > scroll_limit && scroll_ref.current === 0){
//         //     //you have crossed the threshold scroll the first time
//         //     console.log('stopped');
//         //     scroll_ref.current = 1;
//         // }
//         // else if(scroll_position <= scroll_limit & scroll_ref.current === 1){
//         //     scroll_ref.current = 0;
//         //     set_stage(stage === 5 ? 1 : stage + 1);
//         //     console.log('started');
//         // }
//     })

    return (
                <div className="train" ref={train_ref} stage={stage} onAnimationEnd={()=>{
                    if(scroll_ref.current === 0){
                        setTimeout(()=>{
                            //uncomment the below line to start animation of train, I disabled it because i was sick of looking at it.

                            stage === 5 ? set_stage(1) : set_stage(stage + 1);

                        },4000);
                    }
                }}>
                    <div className="engine"></div>
                    {[1,2,3,4].map((element, index)=>{
                        return <div className="coach" key={index}>
                            <p>The Thought can be as long as you want but not longer than this.</p>
                        </div>
                    })}
                </div>
    )
}

function TrainAssembly(props){
    return(
        <div className="train-assembly-wrapper">
            <div className="train-assembly">
                <div className="platform-clock">
                    <p>23:30</p>
                </div>
                <div className="platform-back">
                </div>
                <Train/>
                <div className="platform-front"></div>
            </div>
        </div>
    );
}

export default TrainAssembly;