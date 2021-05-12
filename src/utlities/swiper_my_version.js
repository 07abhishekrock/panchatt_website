class SwiperMyVersion{
    constructor(wrapper_class,parent_class,left_btn,right_btn,child_width,index){
        this.wrapper = document.getElementsByClassName(wrapper_class)[index];
        this.parent = document.getElementsByClassName(parent_class)[index];
        this.left_btn = document.getElementsByClassName(left_btn)[index];
        this.right_btn = document.getElementsByClassName(right_btn)[index];
        this.child_width = this.parent.children ? (this.parent.children[0].offsetWidth + 40) : 300;
        this.child_per_view = Math.floor(window.innerWidth / this.child_width);
        this.index = 0;
        this.current_position = 0;
        this.isLastPosition = 0;
        this.start_position = 0;
        this.translate_position = 0;
        this.diff = 0;
        this.temp_array = [];
        this.offset = 0;
        this.current_screen_touch = [0,0];

        this.resize_observer = new ResizeObserver(()=>{
            let width_diff = (this.parent.children ? (this.parent.children[0].offsetWidth + 40) : 300) - this.child_width;
            this.child_width = this.parent.children ? (this.parent.children[0].offsetWidth + 40) : 300;
            let diff = Math.floor(window.innerWidth / this.child_width) - this.child_per_view;
            this.child_per_view = Math.floor(window.innerWidth / this.child_width);
            this.parent.style.transform = `translateX(${-1 * this.index * this.child_width}px)`;

            if(diff < 0){

                this.parent.style.transform = `translateX(${-1 * this.index * this.child_width}px)`;
                this.current_position = -1 * this.index * this.child_width;
            }

            else if(diff > 0){
                if(-1 * (this.index - diff) * this.child_width > 0){
                    return;
                }
                this.parent.style.transform = `translateX(${-1 * (this.index - diff) * this.child_width}px)`;
                this.index = this.index - diff > 0 ? this.index - diff : 0;
                this.current_position = -1 * this.index * this.child_width;
            }

        })
        this.resize_observer.observe(this.wrapper);

    }
    set_current_position(new_position , counter){
        this.isLastPosition = 0;
        console.log(new_position, counter,this.index - counter);
        if(new_position > 0){
            this.index = 0;
            return 0;
        }
        else if((this.index - counter) + this.child_per_view > this.parent.children.length){
            console.log('fixed',this.index);
            return -1 * this.index * this.child_width;
        }
        this.index = this.index - counter;
        console.log(this.index);
        return new_position;
    }
    set_reset_transition(){
        this.parent.style.transitionDuration = '0.3s';
        setTimeout(()=>{
            this.parent.style.transitionDuration = '0s';
        },300)
    }
    init(){
        this.wrapper.addEventListener('touchstart',(e)=>{
            this.start_position = e.changedTouches[0].screenX;
            this.parent.style.pointerEvents = 'none';
        },true)

        this.wrapper.addEventListener('touchcancel',(e)=>{
            this.wrapper.style.touchAction = 'pan-y';
            this.parent.style.transform = `translate3d(${this.current_position}px,0,0)`;
            this.set_reset_transition();
        });
        this.wrapper.addEventListener('touchmove',(e)=>{
            this.offset = e.changedTouches[0].screenX - this.start_position;
            this.translate_position = this.current_position + this.offset;
            //get angle of touch
            this.diff_x = e.changedTouches[0].screenX - this.current_screen_touch[0];
            this.diff_y = e.changedTouches[0].screenY - this.current_screen_touch[1];

            this.current_screen_touch = [e.changedTouches[0].screenX , e.changedTouches[0].screenY];

            let current_angle = (Math.abs(this.diff_y / this.diff_x));
                //no transform
            if(this.temp_array.length < 2)
                {
                    this.temp_array.push(current_angle);
                }
            else
                {
                    let sum = 0;
                    for(let i of this.temp_array){
                        sum = sum + i;
                    }
                    this.temp_array = [];
                    if(Math.abs(sum / 2) < 1){
                        this.wrapper.style.touchAction = 'pan-x';
                        this.parent.style.transform = `translate3d(${this.translate_position}px,0,0)`;
                        return;
                    }
                }
        },true);
        this.wrapper.addEventListener('touchend',(e)=>{
            this.offset = e.changedTouches[0].screenX - this.start_position;
            this.wrapper.style.touchAction = 'pan-y';
            this.parent.style.pointerEvents = 'all';
            if(this.offset && Math.abs(this.offset) > 80){
                this.current_position = this.set_current_position(this.current_position + Math.sign(this.offset) * this.child_width , Math.sign(this.offset));
                this.parent.style.transform = `translate3d(${this.current_position}px,0,0)`;
                this.set_reset_transition();
            }
            else{
                this.parent.style.transform = `translate3d(${this.current_position}px,0,0)`;
                this.set_reset_transition();
            }
        })

        let event_labels = ['touchstart','click'];

        event_labels.forEach((label)=>{
            this.left_btn.addEventListener(label,(e)=>{
                e.preventDefault();
                this.wrapper.style.touchAction = 'pan-y';
                console.log(this.child_width, 'left');
                this.current_position = this.set_current_position(this.current_position + this.child_width , 1);
                this.parent.style.transform = `translate3d(${this.current_position}px,0,0)`;
                this.set_reset_transition();
            },false);

            this.right_btn.addEventListener(label,(e)=>{
                e.preventDefault();
                this.wrapper.style.touchAction = 'pan-y';
                console.log(this.child_width, 'right');
                this.current_position = this.set_current_position(this.current_position - this.child_width , -1);
                this.parent.style.transform = `translate3d(${this.current_position}px,0,0)`;
                this.set_reset_transition();
            },false);
        })




    }

}

export default SwiperMyVersion;