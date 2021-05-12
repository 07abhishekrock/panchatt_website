class SwiperMyVersion{
    constructor(wrapper_class,parent_class,left_btn,right_btn,child_width,index){
        this.wrapper = document.getElementsByClassName(wrapper_class)[index];
        this.parent = document.getElementsByClassName(parent_class)[index];
        this.left_btn = document.getElementsByClassName(left_btn)[index];
        this.right_btn = document.getElementsByClassName(right_btn)[index];
        this.child_width = child_width;
        this.current_position = 0;
        this.start_position = 0;
        this.translate_position = 0;
        this.diff = 0;
        this.temp_array = [];
        this.offset = 0;
        this.current_screen_touch = [0,0];
    }
    set_current_position(new_position){
        if(new_position > 0){
            return 0;
        }
        else if(new_position < -1 * (this.parent.children.length - 1) * this.child_width){
            return -1 * (this.parent.children.length - 1) * this.child_width;
        }
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
            this.wrapper.style.touchAction = 'pan-y';
            if(this.offset && Math.abs(this.offset) > 80){
                this.current_position = this.set_current_position(this.current_position + Math.sign(this.offset) * this.child_width);
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
                this.current_position = this.set_current_position(this.current_position + this.child_width);
                this.parent.style.transform = `translate3d(${this.current_position}px,0,0)`;
                this.set_reset_transition();
            },false);

            this.right_btn.addEventListener(label,(e)=>{
                e.preventDefault();
                this.wrapper.style.touchAction = 'pan-y';
                this.current_position = this.set_current_position(this.current_position - this.child_width);
                this.parent.style.transform = `translate3d(${this.current_position}px,0,0)`;
                this.set_reset_transition();
            },false);
        })




    }

}

export default SwiperMyVersion;