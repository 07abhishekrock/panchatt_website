import React, { useEffect, useRef, useState } from 'react';
import '../stylesheets/TrainAssembly.css';


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

                            // stage === 5 ? set_stage(1) : set_stage(stage + 1);

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
    let [hrs , set_hrs] = useState((new Date()).getHours());
    let [mins , set_mins] = useState((new Date()).getMinutes());



    //uncomment the below code to start the platform clock

    // useEffect(()=>{

    //     //set the current time

    //     setTimeout(()=>{
    //         if(mins === 59){
    //             set_mins(0);
    //             if(hrs === 23){
    //                 set_hrs(0);
    //                 return;
    //             }
    //             set_hrs(hrs + 1);
    //             return;
    //         }
    //         set_mins(mins + 1);
    //     },60000)

    // },[mins, hrs])

    return(
        <React.Fragment>
            <div className="ticket-wrapper">
                <p>Thought goes here and it can be only this long not longer than this.</p>
            </div>
            <div className="train-assembly-wrapper">
                <div className="train-assembly">
                    <div className="platform-clock">
                        <p>{String(hrs).length > 1 ? hrs : `0${hrs}`}:{String(mins).length > 1 ? mins : `0${mins}`}</p>
                    </div>
                    <div className="platform-back">
                    </div>
                    <Train/>
                    <div className="platform-front"></div>
                    <div className="platform-light"></div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TrainAssembly;